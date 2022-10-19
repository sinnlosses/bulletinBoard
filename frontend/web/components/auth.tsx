import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Auth = ({ children }:any) => {

    const router = useRouter();

    //Cookieのチェック
    const signedIn = Cookies.get("signedIn");
    //signedInがtrueじゃなければ/loginへ
    if (signedIn !== "true") router.replace("/login");

    return children;
}

export default Auth;