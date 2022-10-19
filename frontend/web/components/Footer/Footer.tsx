import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CommentContent, CommentContext } from '../../pages/category/[cid]'

const Footer = (props: { categoryId: string, setPostedComments: Dispatch<SetStateAction<CommentContent[]>>, setCategoryTitle: Dispatch<SetStateAction<string>> }) => {

  const [name, setName] = useState("");
  const [mailaddress, setMailaddress] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const {posterId, setPosterId} = useContext(CommentContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // APIにフォームデータをPOST
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mailaddress", mailaddress);
    formData.append("subject", subject);
    formData.append("body", body);
    formData.append("category_id", props.categoryId);
    formData.append("poster_id", posterId);

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/comments";

    fetch(url, {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((data)  => {
      const url2 = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories/" + props.categoryId;
      const fetchCommentData = () => {
        fetch(url2)
        .then(res => res.json())
        .then(data => {
          const comments = data[0].comments.map(
            (x: { id:number, name: string; mailaddress: string; subject: string, body: string, is_shown: boolean, poster_id: string, created_at: string}) => 
              new CommentContent(x.id, x.name, x.mailaddress, x.subject, x.body, x.is_shown, x.poster_id, new Date(x.created_at) )
          );
          props.setPostedComments(comments);
          props.setCategoryTitle(data[0].name);
         })
         .catch((error) => {
            console.log(error);
         });
      }
      fetchCommentData();
    }).catch((error) => {
        console.log(error);
    });

  };

  return (
    <div className='fixed justify-center bottom-0 h-1/6 w-full md:w-4/5 border border-slate-700 bg-slate-600 bg-opacity-50 p-2'>
      <form className='flex' onSubmit={handleSubmit}>
        {/* 入力フォーム */}
          <div className='flex flex-col h-full w-full md:w-4/5 mr-2'>
            <div className='flex mb-2 justify-between'>
              <input type={"text"} className='rounded w-40 md:w-64 p-0.5' placeholder='名前' value={name} onChange={(e) => setName(e.target.value)} />
              <input type={"email"} className='rounded w-56 md:w-64 p-0.5' placeholder='your_email@example.com' value={mailaddress} onChange={(e) => setMailaddress(e.target.value)} />
              <input type={"text"} className='rounded w-44 md:w-64 p-0.5' placeholder='件名' value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <textarea className='rounded h-16 md:w-full resize-none p-0.5' required placeholder='本文*' value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          {/* 投稿ボタン */}
          <input type={"submit"} className='w-1/5 rounded-full p-5 bg-blue-900' value={"投稿"} />
      </form>
    </div>

  )
}

export default Footer