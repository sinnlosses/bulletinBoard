import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { Category } from '../../components/Sidebar/Sidebar';
import { getAuthCookies } from '../../lib/cookie';
import { createCategory } from '../../lib/fetcher';
import { AuthContext, NextPageWithLayout, SidebarContext } from '../_app';

const create:NextPageWithLayout = () => {
  const router = useRouter();
  const { isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!isSignedIn) router.push('/');
  }), [router];
  
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {sidebarContent, setSidebarContent} = useContext(SidebarContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = createCategory(formData);
    result.then((res) => {
      if (res.status === "SUCCESS") {
        const newCategory:Category = new Category(res.data.name, "/category/"+res.data.id);
        setSidebarContent([...sidebarContent, newCategory]);
        router.push("/admin");
      } else {
        setErrorMessage(res.data);
      }
    }).catch((error) => {
      console.log(error);
      setErrorMessage("登録に失敗しました");
    });
  };

  return (
    <>
      {isSignedIn &&
        <div className="flex h-screen">
          <div className="m-auto h-1/4 w-1/4">
            <h1 className='text-4xl mb-4'>カテゴリ追加</h1>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col border border-solid rounded p-2'>
                  {/* カテゴリ名 */}
                  <div className='flex flex-col'>
                    <label>カテゴリ名</label>
                    <input name="name" type={"text"} className='p-1 rounded' required />
                  </div>
                  {/* 登録ボタン */}
                  <input type={"submit"} className='mt-4 border border-solid rounded bg-slate-700 hover:bg-slate-600' value='登録' />
                  {/* エラーメッセージ */}
                  <div className='mt-4 text-red-900'>
                    {errorMessage}
                  </div>
              </div>
            </form>
          </div>
        </div>
      }
    </>

  );
}

create.getLayout = (page: any) => page


export default create