import Cookies from "js-cookie"

import { SignInParams } from "../interfaces"

// サインイン（ログイン）
export const signIn = async (params: SignInParams)  => {
    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/auth/sign_in";
    const formData = new FormData();
    formData.append("email", params.email)
    formData.append("password", params.password)

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export const signOut = ()  => {
    // const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/auth/sign_out";
    const url = "http://localhost/api/v1/auth/sign_out";
    const formData = new FormData();
    formData.append("access-token", Cookies.get("access_token") || "");
    formData.append("client", Cookies.get("client") || "");
    formData.append("uid", Cookies.get("uid") || "");

    fetch(url, {
        method : 'DELETE',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((res) => {
        if (res.success) {
            Cookies.remove("uid");
            Cookies.remove("client");
            Cookies.remove("access-token");
        }
    }).catch((error) => {
        console.log(error);
    })
};

// 認証済みのユーザーを取得
export const getCurrentUser = async () => {
    const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/auth/sessions";

    if (!Cookies.get("access-token") || !Cookies.get("client") || !Cookies.get("uid")) return
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "access-token": Cookies.get("access-token") || "",
                "client": Cookies.get("client") || "",
                "uid": Cookies.get("uid") || ""
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}