
export default class CommentContent {
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

    /**
     * インスタンスを生成する(id, created_atパラメータは無効な値として初期化する)
     * @param name 名前
     * @param mailaddress メールアドレス
     * @param subject 件名
     * @param body 本文
     * @param posterId 投稿者ID
     * @returns インスタンス
     */
    static valueOf(name:string, mailaddress:string, subject:string, body:string, posterId:string):CommentContent {
      return new CommentContent(-1, name, mailaddress, subject, body, true, posterId, new Date());
    }
  }