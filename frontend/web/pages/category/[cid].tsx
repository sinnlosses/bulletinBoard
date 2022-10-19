import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Comments from '../../components/Comments/Comments';
import Footer from '../../components/Footer/Footer';

export class CommentContent {
  id:number
  name:string
  mailaddress:string
  subject:string
  body:string
  isShown:boolean
  posterId:string
  created_at:Date

  constructor(id:number, name:string, mailaddress:string, subject:string, 
              body:string, isShown:boolean, posterId:string, created_at:Date) {
    this.id = id;
    this.name = name;
    this.mailaddress = mailaddress;
    this.subject = subject;
    this.body = body;
    this.isShown = isShown;
    this.posterId = posterId;
    this.created_at = created_at;
  }
}

/**
 * コメントの表示、非表示を扱うコンテキストの型
 */
 type TCommentContext = {
  postedComments: Array<CommentContent>;
  setPostedComments: React.Dispatch<React.SetStateAction<Array<CommentContent>>>
  posterId: string
  setPosterId: React.Dispatch<React.SetStateAction<string>>
};

// コメントの表示、非表示を扱うコンテキスト
export const CommentContext = createContext({} as TCommentContext);

const Cid:NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;
  const categoryId = cid === undefined ? "1" : cid.toString();

  const [postedComments, setPostedComments] = useState<CommentContent[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [posterId, setPosterId] = useState("");

  useEffect(() => {
    const cookies = parseCookies();
    const pid = cookies["poster-id"];
    if (pid) {
      setPosterId(pid);
    } else {
      const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N=16;
      const randomString = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
      setPosterId(randomString);
      setCookie(null, "poster-id", randomString);
    }
  }, []);

  // コメントデータ取得 + タイトル表示
  useEffect(() => {
    if (!router.isReady) return; //routerの準備中はここで処理をstop

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories/" + categoryId;
    const fetchCommentData = () => {
      fetch(url)
      .then(res => res.json())
      .then(data => {
        const comments:CommentContent[] = data[0].comments.map(
          (x: {id:string, name: string; mailaddress: string; subject: string, body: string, is_shown: boolean, poster_id:string, created_at: string}) => 
            new CommentContent(Number(x.id), x.name, x.mailaddress, x.subject, x.body, x.is_shown, x.poster_id, new Date(x.created_at) )
        );
        setPostedComments(comments);
        setCategoryTitle(data[0].name);
       })
       .catch((error) => {
          console.log(error);
       });
    }
    fetchCommentData();

    return

  },[router]);
  
  return (
    <div className="flex flex-col justify-center items-center mt-2 w-full">
        <div className="text-4xl font-semibold">
          {categoryTitle}
        </div>
        <CommentContext.Provider value={{ postedComments, setPostedComments, posterId, setPosterId}}>
          <Comments />
          <Footer categoryId={categoryId} setPostedComments={setPostedComments} setCategoryTitle={setCategoryTitle}/>
        </CommentContext.Provider>
    </div>
  );
};

export default Cid;