import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  return (
    <div className='flex h-full flex-col ml-2'>
      <h1 className='text-4xl my-5 font-bold text-center'>XXX掲示板にようこそ!!</h1>
      <h2 className='text-2xl mb-5'>概要説明</h2>
      <h2 className='text-2xl mb-5'>使い方</h2>
    </div>
  )
}

export default Home
