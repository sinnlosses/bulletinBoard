import React, { useContext } from 'react'
import { showOrHideComment } from '../../lib/fetcher';
import { CommentContext } from '../../pages/category/[cid]'
import { AuthContext } from '../../pages/_app';
import CommentContent from './CommentContent';


/**
 * コメントコンポーネント
 * @returns コメントコンポーネント
 */
const Comments = () => {

  const { isSignedIn } = useContext(AuthContext);
  const { postedComments, setPostedComments, posterId } = useContext(CommentContext);

  // 非表示ボタンのクリック時動作
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();

    // コメントID
    const commentId = Number(event.currentTarget.getAttribute("data-cid")) || -1;
    // 表示or非表示
    const isShown = event.currentTarget.getAttribute("data-isshown")?.toString() || "false";

    const res = showOrHideComment(commentId, isShown)
    res.then((result) => {

      if (result.status === "SUCCESS") {
        const newComments = postedComments.map((comment, index) =>
        (comment.id === commentId ? new CommentContent(comment.id, comment.name, comment.mailaddress,
          comment.subject, comment.body, JSON.parse(isShown),
          comment.posterId, new Date(comment.created_at))
          : comment
        ));

        setPostedComments(newComments);
      }

    });
  };

  return (
    <div className='w-3/4 mb-72'>
      <ul>
        {postedComments.map((pvalue, key) => (
          (pvalue.isShown || isSignedIn) &&
          <li key={key} className='my-5 rounded border border-solid border-slate-700 p-2'>
            <div className='w-full flex flex-col'>
              <div className='flex mb-3'>
                {/* ID */}
                <div className='mr-1'>{pvalue.id}</div>
                {/* 名前がある場合はその名前、ない場合は固定文字列 */}
                <div className='mr-1'>
                  {pvalue.name && <p>{pvalue.name}</p>} {!pvalue.name && <p>名無しさん</p>}
                </div>
                {/* メールアドレスはある場合は表示、ない場合は非表示 */}
                <div className='mr-5'>
                  {pvalue.mailaddress && <p>({pvalue.mailaddress})</p>} {!pvalue.mailaddress && <p>(emailなし)</p>}
                </div>
                {/* 投稿日時 */}
                {pvalue.created_at && <p>{pvalue.created_at.toLocaleString()}</p>}
                <div className='ml-auto'>
                  {/* 再表示ボタン */}
                  {isSignedIn && !pvalue.isShown && <button className='p-1 bg-slate-700 hover:bg-slate-600 rounded' onClick={handleOnClick} data-cid={pvalue.id} data-isshown={true}>再表示</button>}
                  {/* 非表示ボタン */}
                  {posterId === pvalue.posterId && pvalue.isShown && <button className='p-1 bg-slate-700 hover:bg-slate-600 rounded' onClick={handleOnClick} data-cid={pvalue.id} data-isshown={false}>非表示</button>}
                </div>
              </div>
              <div className='font-semibold'>
                {pvalue.subject && <p>{pvalue.subject}</p>} {!pvalue.subject && <p>件名なし</p>}
              </div>

              <p>{pvalue.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments