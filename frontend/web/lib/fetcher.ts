import urljoin from 'url-join';
import CommentContent from '../components/Comments/CommentContent';
import { CategoryInfo } from '../pages/admin';
import { getAuthCookies } from './cookie';

/**
 * コメントを表示または非表示した結果
 */
type ShowOrHideResult = {
    status: string
    data: string
}

/**
 * コメントを登録した結果
 */
 type CreateCommentResult = {
    status: string
    data: string
}

/**
 * カテゴリを登録した結果
 */
 type CreateCategoryResult = {
    status: string
    data: any
}


export const fetchCategory = async(categoryId:string) => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "categories", categoryId);

    const fetchCategoryData = await fetch(url)
        .then((res) => { return res.json(); })
        .catch((error) => {
            console.log(error);
            throw new Error(error);
        });
    
    return fetchCategoryData;
}

/**
 * 指定したカテゴリIDに対応するカテゴリ名+コメントを取得する
 * @param categoryId カテゴリID
 * @returns カテゴリ名 + コメント
 */
export const fetchCategoryWithComments = async(categoryId:string) => {

    if (!categoryId) {
        return {
            "categoryTitle": "",
            "comments": []
        };
    }

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "categories", categoryId);

    const res = await fetch(url)
        .then(res => res.json())
        .then(data => {
            const comments: CommentContent[] = data[0].comments.map(
            (x: { id: string, name: string; mailaddress: string; subject: string, body: string, is_shown: boolean, poster_id: string, created_at: string }) =>
                new CommentContent(Number(x.id), x.name, x.mailaddress, x.subject, x.body, x.is_shown, x.poster_id, new Date(x.created_at))
            );
            return {
                "categoryTitle": data[0].name,
                "comments": comments
            }
        })
        .catch((error) => {
            throw new Error(error);
        });

    return res;
}


/**
 * カテゴリの統計データを取得する
 * @returns カテゴリの統計データ
 */
 export const fetchStatistics = async() => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "statistics");
    const cookies = getAuthCookies();

    const fetchCategoryData: CategoryInfo[] = await fetch(url, {
            method: "GET",
            headers: cookies
        })
        .then(res => res.json())
        .then(res => {
            const categoryInfoList = res.data.map((x: { id: string; name: string; commentcount: string }) =>
                new CategoryInfo(Number(x.id), x.name, Number(x.commentcount)));
            return categoryInfoList;
    });

    return fetchCategoryData;
}


/**
 * コメントを登録する
 * @param name 名前
 * @param mailaddress メールアドレス
 * @param subject 件名
 * @param body 本文
 * @param posterId 投稿者ID
 * @param categoryId カテゴリID
 * @returns 実行結果
 */
export const createComment = async(name:string, mailaddress:string, subject:string, body:string, posterId:string, categoryId:string) => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "comments");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mailaddress", mailaddress);
    formData.append("subject", subject);
    formData.append("body", body);
    formData.append("poster_id", posterId);
    formData.append("category_id", categoryId);

    const res: CreateCommentResult = await fetch(url, {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        throw new Error(error);
    });

    return res;
}

export const createCategory = async(formData: FormData) => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "categories");

    const res:CreateCategoryResult = await fetch(url, {
      method: 'POST',
      headers: getAuthCookies(),
      body: formData
    }).then((response) => {
        return response.json();
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });

    return res;
}


/**
 * 指定したコメントを表示または非表示化する
 * @param commentId コメントID
 * @param isShown 表示or非表示
 * @returns 実行結果
 */
 export const showOrHideComment = async(commentId:number, isShown:string) => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "comments", commentId.toString());

    const formData = new FormData();
    formData.append("is_shown", isShown);

    const res: ShowOrHideResult = await fetch(url, {
        method: 'PUT',
        body: formData
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            console.log(error);
            throw new Error(error);
        });
    
    return res;
}


/**
 * カテゴリを更新する
 * @param categoryId カテゴリID
 * @param formData 登録データ
 * @returns 実行結果
 */
export const updateCategory = async(categoryId:string, formData:FormData) => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "categories", categoryId);

    const res = await fetch(url, {
        method: 'PUT',
        headers: getAuthCookies(),
        body: formData
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.log(error);
        throw new Error(error);
    });
    
    return res;
}


/**
 * カテゴリを削除する
 * @param categoryId カテゴリID
 * @returns 実行結果
 */
export const deleteCategory = async(categoryId:string) => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "categories", categoryId);

    const res = await fetch(url, {
      method: 'DELETE',
      headers: getAuthCookies()
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.log(error);
        throw new Error(error);
    });

    return res;
}