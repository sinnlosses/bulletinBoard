import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { signin } from '../lib/auth';
import { AuthContext } from './_app';

const login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setIsSignedIn, setCurrentUser} = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const result = signin(formData);
    result.then((res) => {
      if (res.success) {
        setIsSignedIn(true);
        setCurrentUser(res.data);
        router.push("/");
      } else {
        console.log(res.data);
        setErrorMessage("認証に失敗しました");
      }
    }).catch((error) => {
      console.log(error);
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