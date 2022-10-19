import "../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import Layout from "../components/Layouts/Layouts";
import { Category, SidebarClassName } from "../components/Sidebar/Sidebar";
import { getCurrentUser } from "../lib/auth";
import { User } from "../interfaces";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * サイドバーの表示、非表示を扱うコンテキストの型
 */
type TSidebarContext = {
  sidebarStatus: string;
  setSidebarStatus: React.Dispatch<React.SetStateAction<string>>;
  sidebarContent: Array<Category>;
  setSidebarContent: React.Dispatch<React.SetStateAction<Array<Category>>>
};

// 管理者権限に関するグローバル変数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

// サイドバーの表示、非表示を扱うコンテキスト
export const SidebarContext = React.createContext({} as TSidebarContext);

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {

  // サイドバーの表示、非表示状態を管理
  const [sidebarStatus, setSidebarStatus] = useState(SidebarClassName.toggleOff);
  // サイドバーの内容の管理
  const [sidebarContent, setSidebarContent] = useState<Category[]>([]);
  // 管理者権限の管理
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.is_login === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data)

      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  // サイドバーの内容を取得して反映
  useEffect(() => {
    if(router.pathname === "/login") return;

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories";
    const fetchSidebarData = () => {
      fetch(url)
      .then(res => res.json())
      .then(data => {
        const categories = data.map( (x: { id: string; name: string; created_at: string}) => new Category( x.name, "/category/"+x.id ));
        setSidebarContent(categories);
       });
    }
    fetchSidebarData();

  },[])

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
      <SidebarContext.Provider value={{ sidebarStatus, setSidebarStatus, sidebarContent, setSidebarContent }}>
        {getLayout(<Component {...pageProps} />)}
      </SidebarContext.Provider>
    </AuthContext.Provider>

  );
}

export default MyApp;
