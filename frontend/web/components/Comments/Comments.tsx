import React from 'react'
import { CommentContent } from '../../pages/category/[cid]'

const Comments = (props: { commentContents: CommentContent[]}) => {
  return (
    <div className='w-3/4 mb-72'>
      <ul>
      {props.commentContents.map((pvalue, key) => (
          <li key={key} className='my-5 rounded border border-solid border-slate-700 p-2'>
            <div className='w-full flex flex-col'>
              <div className='flex mb-3'>
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