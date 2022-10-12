import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Comments from '../../components/Comments/Comments';
import Footer from '../../components/Footer/Footer';

export class CommentContent {
  name:string
  mailaddress:string
  subject:string
  body:string
  is_shown:boolean
  created_at:Date

  constructor(name:string, mailaddress:string, subject:string, 
              body:string, is_shown:boolean, created_at:Date) {
    this.name = name;
    this.mailaddress = mailaddress;
    this.subject = subject;
    this.body = body;
    this.is_shown = is_shown;
    this.created_at = created_at;
  }
}

const Cid = () => {
  const router = useRouter();
  const { cid } = router.query;

  const [postedComments, setPostedComments] = useState<CommentContent[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  // コメントデータ取得 + タイトル表示
  useEffect(() => {
    if (!router.isReady) return; //routerの準備中はここで処理をstop

    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/categories/" + cid;
    const fetchCommentData = () => {
      fetch(url)
      .then(res => res.json())
      .then(data => {
        const comments = data[0].comments.map(
          (x: { name: string; mailaddress: string; subject: string, body: string, is_shown: boolean, created_at: string}) => 
            new CommentContent( x.name, x.mailaddress, x.subject, x.body, x.is_shown, new Date(x.created_at) )
        );
        setPostedComments(comments);
        setCategoryTitle(data[0].name);
       });
    }
    fetchCommentData();

  },[router]);
  
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2 w-full">
          <div className="text-4xl font-semibold">
            {categoryTitle}
          </div>
          <Comments commentContents={postedComments}/>
          <Footer />
      </div>
    </>
  );
};

export default Cid;