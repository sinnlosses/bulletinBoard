import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Category } from '../../../components/Sidebar/Sidebar';
import { SidebarContext } from '../../_app';

const Eid:NextPage = () => {
  const router = useRouter();
  const { eid } = router.query;
  const [categoryName, setCategoryName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const categoryId = eid === undefined ? "1" : eid.toString();
  const {sidebarContent, setSidebarContent} = useContext(SidebarContext);

  // カテゴリデータ取得
  useEffect(() => {
    if (!router.isReady) return; //routerの準備中はここで処理をstop

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories/" + categoryId;
    const fetchCategoryData = () => {
      fetch(url)
      .then(res => res.json())
      .then(data => {
        setCategoryName(data[0].name);
       })
       .catch((error) => {
          console.log(error);
       });
    }
    fetchCategoryData();

    return

  },[router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories/"+categoryId;
    const formData = new FormData(event.currentTarget);

    setErrorMessage("");

    fetch(url, {
      method: 'PUT',
      body: formData
    }).then((response) => {
        return response.json();
    }).then((res)  => {
      if (res.status == "SUCCESS") {
        const name = formData.get("name")?.toString() || "";
        setSidebarContent(
          sidebarContent.map((category, index) => 
            (category.link.split("/").slice(-1)[0] === categoryId ? new Category(name, category.link) : category))
        );
        router.push("/admin");
      } else {
        setErrorMessage("更新に失敗しました");
      }
      
    }).catch((error) => {
      console.log(error);
      setErrorMessage("更新に失敗しました");
    });
  };
  
  return (
    <div className="flex h-screen">
      <div className="m-auto h-1/4 w-1/4">
        <h1 className='text-4xl mb-4'>カテゴリ更新</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col border border-solid rounded p-2'>
              <label>変更前</label>
              {categoryName}
              <label>変更後</label>
              <input name={"name"} type={"text"} className='rounded p-1' required />
              {/* 更新ボタン */}
              <input type={"submit"} className='mt-4 rounded bg-blue-900 hover:bg-blue-800' value='更新' />
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

export default Eid;