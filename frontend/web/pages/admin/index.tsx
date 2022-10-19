import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export class CategoryInfo {
  id:number
  name:string
  commentCount:number

  constructor(id:number, name:string, commentCount:number) {
    this.id = id;
    this.name = name;
    this.commentCount = commentCount;
  }
}

const admin:NextPage = () => {

  const [categoryInfoList, setCategoryInfoList] = useState<CategoryInfo[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/statistics";
    const fetchCategoryData = () => {
      fetch(url)
      .then(res => res.json())
      .then(res => {
        const categoryInfoList = res.data.map( (x: { id: string; name: string; commentcount: string}) => 
          new CategoryInfo( Number(x.id), x.name, Number(x.commentcount) ));
        setCategoryInfoList(categoryInfoList);
       });
    }
    fetchCategoryData();

  },[])
  
  return (
      <>
        <div className="mt-2 text-4xl font-semibold text-center">
          管理者ページ
        </div>
        <div className='flex flex-col justify-center items-center my-4'>
          <Link href={"/category/create"}>
            <button className='text-2xl bg-green-900 hover:bg-green-800 rounded p-2 mb-4'>カテゴリ追加</button>
          </Link>
          <table className="table-auto border border-solid border-slate-600 border-separate border-spacing-4 p-2">
          <thead>
          <tr>
          <th>id</th>
          <th>カテゴリ名</th>
          <th>投稿数</th>
          <th>操作</th>
          </tr>
          </thead>
          <tbody>
            {categoryInfoList.map((categoryInfo, key) => (
              <tr key={key} className='border border-solid border-slate-700'>
                <td className='text-center'>{categoryInfo.id}</td>
                <td className=''>{categoryInfo.name}</td>
                <td className='text-center'>{categoryInfo.commentCount}</td>
                <td>
                  <Link href={"/category/edit/"+categoryInfo.id}>
                    <button className='bg-blue-900 hover:bg-blue-800 rounded p-2 mr-2'>編集</button>
                  </Link>
                  <Link href={"/category/delete/"+categoryInfo.id}>
                    <button className='bg-red-900 hover:bg-red-800 rounded p-2'>削除</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </>


  )
}

export default admin