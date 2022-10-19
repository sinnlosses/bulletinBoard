import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../../_app';

const Did:NextPage = () => {
  const router = useRouter();
  const { did } = router.query;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const categoryId = did === undefined ? "1" : did.toString();
  const {sidebarContent, setSidebarContent} = useContext(SidebarContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories/"+categoryId;

    setErrorMessage("");

    fetch(url, {
      method: 'DELETE'
    }).then((response) => {
        return response.json();
    }).then((res)  => {
      if (res.status == "SUCCESS") {
        const newCategories = sidebarContent.filter((category, index) => (category.link.split("/").slice(-1)[0] != categoryId));
        setSidebarContent(newCategories);
        router.push("/admin");
      } else {
        setErrorMessage("削除に失敗しました");
      }
      
    }).catch((error) => {
      console.log(error);
      setErrorMessage("削除に失敗しました");
    });
  };
  
  return (
    <div className="flex h-screen">
      <div className="m-auto h-1/4 w-1/4">
        <h1 className='text-4xl mb-4'>カテゴリ削除</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col border border-solid rounded p-2'>
              {/* 削除ボタン */}
              <input type={"submit"} className='mt-4 border border-solid rounded bg-red-900 hover:bg-red-800' value='削除' />
              {/* エラーメッセージ */}
              <div className='mt-4 text-red-900'>
                {errorMessage}
              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Did;