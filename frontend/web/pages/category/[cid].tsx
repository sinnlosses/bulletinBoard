import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies'
import { getRandomString } from '../../lib/utils';
import { fetchCategoryWithComments } from '../../lib/fetcher';
import Comments from '../../components/Comments/Comments';
import CommentContent from '../../components/Comments/CommentContent';
import Footer from '../../components/Footer/Footer';


/**
 * コメントに関するコンテキスト型
 */
type TCommentContext = {
  postedComments: Array<CommentContent>;
  setPostedComments: React.Dispatch<React.SetStateAction<Array<CommentContent>>>
  posterId: string
  setPosterId: React.Dispatch<React.SetStateAction<string>>
  categoryTitle: string
  setCategoryTitle: React.Dispatch<React.SetStateAction<string>>
};


/**
 * コメントの表示、非表示を扱うコンテキスト
 */
export const CommentContext = createContext({} as TCommentContext);


/**
 * 指定されたカテゴリに対応するコメントデータを表示するメイン部
 * @returns NextPage
 */
const Cid: NextPage = () => {

  const router = useRouter();
  const { cid } = router.query;

  // カテゴリID
  const categoryId = cid?.toString() || "";
  // カテゴリ名
  const [categoryTitle, setCategoryTitle] = useState("");
  // 投稿されたコメント
  const [postedComments, setPostedComments] = useState<CommentContent[]>([]);
  // 投稿者ID
  const [posterId, setPosterId] = useState("");

  // 投稿者IDクッキーが存在する場合は投稿者IDに設定、なければ新たに生成して設定する
  useEffect(() => {
    const keyPosterId = "poster-id";
    const cookies = parseCookies();
    const pid = cookies[keyPosterId];
    if (pid) {
      setPosterId(pid);
    } else {
      const randomString = getRandomString(16);
      setPosterId(randomString);
      setCookie(null, keyPosterId, randomString);
    }
  }, []);

  // コメントデータ取得 + タイトル表示
  useEffect(() => {
    if (!router.isReady) return; //routerの準備中はここで処理をstop

    const res = fetchCategoryWithComments(categoryId);
    res.then((value) => {
      setPostedComments(value.comments);
      setCategoryTitle(value.categoryTitle);
    });

  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center mt-2 w-full">
      <div className="text-4xl font-semibold">
        {categoryTitle}
      </div>
      <CommentContext.Provider value={{ postedComments, setPostedComments, posterId, setPosterId, categoryTitle, setCategoryTitle }}>
        <Comments />
        <Footer categoryId={categoryId} />
      </CommentContext.Provider>
    </div>
  );
};

export default Cid;