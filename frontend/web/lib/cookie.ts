import Cookies from "js-cookie"

/**
 * ユーザー認証に使用するクッキーを取得する
 * @returns ユーザー認証に使用するクッキー
 */
export const getAuthCookies = () => {
    const cookies: { [key: string]: string }  = {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
    }
    return cookies;
}


/**
 * ユーザー認証に使用するクッキーを保存する
 * @param uid ユーザーID
 * @param client クライアント
 * @param accessToken アクセストークン
 */
export const setAuthCookies = (uid:string, client:string, accessToken:string) => {
    Cookies.set("uid", uid);
    Cookies.set("client", client);
    Cookies.set("access-token", accessToken);
}

/**
 * ユーザー認証に使用するクッキーを削除する
 */
export const removeAuthCookies = () => {
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
}
