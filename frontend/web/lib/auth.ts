import urljoin from "url-join";
import { getAuthCookies, removeAuthCookies, setAuthCookies } from "./cookie";

/**
 * サインインした結果
 */
 type SigninResult = {
    success: boolean,
    data: string
}

/**
 * サインアウトした結果
 */
 type SignoutResult = {
    success: boolean
}

/**
 * サインインする
 * @param formData 認証データ
 * @returns 実行結果
 */
export const signin = async (formData: FormData)  => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "auth/sign_in");

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      mode: "cors"
    }).then(async (response) => {
      if (response.ok) {
        setAuthCookies(response.headers.get("uid") || "",
                        response.headers.get("client") || "",
                        response.headers.get("access-token") || "");

        return {"success": true, "data": await response.json()}

      } else {
        removeAuthCookies();
        return {"success": false, "data": await response.json()}
      }
    }).catch((error) => {
      console.log(error);
      removeAuthCookies()
      throw new Error(error);
    });

    return res;
};


/**
 * サインアウトする
 * @returns 実行結果
 */
export const signout = async() => {

    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "auth/sign_out");
    const cookies = getAuthCookies();

    const formData = new FormData();
    for (const cookie in cookies) {
        formData.append(cookie, cookies[cookie]);
    }

    const res:SignoutResult = await fetch(url, {
        method: 'DELETE',
        headers: cookies,
        body: formData
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        throw new Error(error);
    })

    return res;
};


/**
 * 認証済みのユーザーを取得する
 * @returns 認証済みのユーザー
 */
export const getCurrentUser = async () => {
    
    const url = urljoin(process.env.NEXT_PUBLIC_API_BASEURL || "", "auth/sessions");
    const cookies = getAuthCookies();

    for (const cookie in cookies) {
        if (!cookies[cookie]) {
            return;
        }
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: cookies
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        throw new Error(error);
    });

    return response;
}