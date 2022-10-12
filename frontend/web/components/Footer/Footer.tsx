import React from 'react'

const Footer = () => {
  return (
    <div className='fixed justify-center bottom-0 h-1/6 w-full md:w-4/5 border border-slate-700 bg-slate-600 bg-opacity-50 p-2'>
      <div className='flex'>
        {/* 入力フォーム */}
        <form>

        </form>
        <div className='flex flex-col h-full w-full md:w-4/5 mr-2'>
          <div className='flex mb-2 justify-between'>
            <input type={"text"} className='rounded w-40 md:w-64 p-0.5' required placeholder='名前'></input>
            <input type={"email"} className='rounded w-56 md:w-64 p-0.5' placeholder='your_email@example.com'></input>
            <input type={"text"} className='rounded w-44 md:w-64 p-0.5' placeholder='件名'></input>
          </div>
          <textarea className='rounded h-16 md:w-full resize-none p-0.5' placeholder='本文*'></textarea>
        </div>
        {/* 投稿ボタン */}
        <button className='w-1/5 rounded-full p-5 bg-blue-900'>投稿</button>
      </div>
    </div>

  )
}

export default Footer