import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { AuthContext } from './_app';

const login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser} = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/auth/sign_in";
    const formData = new FormData(event.currentTarget);

    setErrorMessage("");

    fetch(url, {
      method: 'POST',
      body: formData,
      mode: "cors"
    }).then((response) => {
      if (response.ok) {
        Cookies.set("uid", response.headers.get("uid") || "");
        Cookies.set("client", response.headers.get("client") || "");
        Cookies.set("access-token", response.headers.get("access-token") || "");
        setIsSignedIn(true);
      } else {
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        setErrorMessage("認証に失敗しました");
      }

      return response.json();
    }).then((response) => {
        if (isSignedIn) {
          setCurrentUser(response.data);
          router.push("/");
        }
    }).catch((error) => {
      console.log(error);
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      setErrorMessage("認証に失敗しました");
    });

  };

  return (
    <div className="flex h-screen">
      <div className="m-auto h-1/4 w-1/4">
        <h1 className='text-4xl mb-4'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col border border-solid rounded p-2'>
              {/* メールアドレス */}
              <div className='flex flex-col'>
                <label>メールアドレス</label>
                <input name="email" type={"text"} className='p-1 rounded' placeholder='your_email@example.com' required />
              </div>
              {/* パスワード */}
              <div className='flex flex-col mt-2'>
                <label>パスワード</label>
                <input name='password' type={"password"} className='p-1 rounded' required />
              </div>
              {/* ログインボタン */}
              <input type={"submit"} className='mt-4 border border-solid rounded bg-slate-700 hover:bg-slate-600' value='ログイン' />
              {/* エラーメッセージ */}
              <div className='mt-4 text-red-900'>
                {errorMessage}
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

login.getLayout = (page: any) => page


export default login