import React, { useContext, useState } from 'react'
import { createComment, fetchCategoryWithComments } from '../../lib/fetcher';
import { CommentContext } from '../../pages/category/[cid]'

const Footer = (props: { categoryId: string }) => {

  const [name, setName] = useState("");
  const [mailaddress, setMailaddress] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const {posterId, setCategoryTitle, setPostedComments} = useContext(CommentContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // APIにフォームデータをPOST
    const createResult = createComment(name, mailaddress, subject, body, posterId, props.categoryId);
    createResult.then((result) => {
      if (result.status === "SUCCESS") {
        const fetchResult = fetchCategoryWithComments(props.categoryId);
        fetchResult.then((result) => {
          setPostedComments(result.comments);
          setCategoryTitle(result.categoryTitle);
        });
      }
    });
  };

  return (
    <div className='fixed bottom-0 h-1/6 w-full md:w-4/5 border border-slate-700 bg-slate-600 bg-opacity-50 p-2'>
      <form className='flex' onSubmit={handleSubmit}>
        {/* 入力フォーム */}
          <div className='flex flex-col h-full w-full md:w-4/5 mr-2'>
            <div className='flex mb-2 justify-between'>
              <input type={"text"} className='rounded w-1/4 p-0.5 mr-1' placeholder='名前' value={name} onChange={(e) => setName(e.target.value)} />
              <input type={"email"} className='rounded w-1/2 p-0.5 mr-1' placeholder='your_email@example.com' value={mailaddress} onChange={(e) => setMailaddress(e.target.value)}/>
              <input type={"text"} className='rounded w-1/4 p-0.5' placeholder='件名' value={subject} onChange={(e) => setSubject(e.target.value)}/>
            </div>
            <textarea name='body' className='rounded h-16 md:w-full resize-none p-0.5' required placeholder='本文*' value={body} onChange={(e) => setBody(e.target.value)}/>
          </div>
          {/* 投稿ボタン */}
          <input type={"submit"} className='w-1/5 rounded-full p-5 bg-blue-900 mr-2' value={"投稿"} />
      </form>
    </div>

  )
}

export default Footer