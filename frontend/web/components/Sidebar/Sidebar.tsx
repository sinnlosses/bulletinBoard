import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { Admin, Home } from "./SidebarData";
import { AuthContext, SidebarContext } from "../../pages/_app";
import { useWindowSize } from "react-use";

/**
 * カテゴリ型
 */
export class Category {
  title: string;
  link: string;

  constructor(title:string, link:string) {
    this.title = title;
    this.link = link;
  }
};

/**
 * リスト項目
 * @param props カテゴリ
 * @returns リスト項目
 */
const ListItem = (props: Category) => {
  return (
    <li className="m-2">
      <Link href={props.link}>
        <a className={`flex p-2 rounded hover:bg-slate-700 cursor-pointer`}>
          <div className="mx-2">{props.title}</div>
        </a>
      </Link>
    </li>
  );
};

/**
 * サイドバーの表示・非表示を扱うクラス名
 */
export const SidebarClassName = {
  toggleOff: "hidden md:block",
  toggleOn: "block",
};

export default function Sidebar() {
  const { sidebarStatus, setSidebarStatus, sidebarContent, setSidebarContent } = useContext(SidebarContext);
  const { isSignedIn, setIsSignedIn} = useContext(AuthContext);

  const { height, width } = useWindowSize();
  useEffect(() => {
    setSidebarStatus(SidebarClassName.toggleOff);
  }, [width, height, setSidebarStatus]);

  return (
    <div className={sidebarStatus}>
      <aside
        className="bg-slate-900 h-screen md:w-72 fixed z-20 overflow-y-scroll
                  border-r border-solid border-slate-700"
      >
        <nav className="mb-20">
          <ul>
            {/* ホーム */}
            <ListItem
              key={Home.title}
              title={Home.title}
              link={Home.link}
            />

            {/* 管理ページ */}
            {isSignedIn &&
              <ListItem
                key={Admin.title}
                title={Admin.title}
                link={Admin.link}
              />
            }

            {/* カテゴリ */}
            {sidebarContent.map((pvalue, key) => (
                <ListItem
                  key={key}
                  title={pvalue.title}
                  link={pvalue.link}
                />
            ))}

          </ul>
        </nav>
      </aside>
    </div>
  );
}
