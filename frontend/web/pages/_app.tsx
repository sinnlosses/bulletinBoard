import "../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Layout from "../components/Layouts/Layouts";
import { Category, SidebarClassName } from "../components/Sidebar/Sidebar";

type NextPageWithLayout = NextPage & {
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

// サイドバーの表示、非表示を扱うコンテキスト
export const SidebarContext = React.createContext({} as TSidebarContext);

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {

  // サイドバーの表示、非表示状態を管理
  const [sidebarStatus, setSidebarStatus] = useState(SidebarClassName.toggleOff);
  // サイドバーの内容の管理
  const [sidebarContent, setSidebarContent] = useState<Category[]>([]);

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

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <SidebarContext.Provider value={{ sidebarStatus, setSidebarStatus, sidebarContent, setSidebarContent }}>
      {getLayout(<Component {...pageProps} />)}
    </SidebarContext.Provider>
  );
}

export default MyApp;
