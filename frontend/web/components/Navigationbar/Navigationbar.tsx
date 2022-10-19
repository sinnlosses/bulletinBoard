import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext, SidebarContext } from "../../pages/_app";
import { SidebarClassName } from "../Sidebar/Sidebar";
import Cookies from "js-cookie";

const Navigationbar = () => {

    const {sidebarStatus, setSidebarStatus} = useContext(SidebarContext);
    const { isSignedIn, setIsSignedIn} = useContext(AuthContext);

    const toggleSwitch = () => {
        if (sidebarStatus == SidebarClassName.toggleOff){
            setSidebarStatus(SidebarClassName.toggleOn);
        } else {
            setSidebarStatus(SidebarClassName.toggleOff);
        }
    }

    const handleSignOut = () => {
        // const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/auth/sign_out";
        const url = process.env.NEXT_PUBLIC_API_HOST + "/api/v1/auth/sign_out";

        const formData = new FormData();
        formData.append("access-token", Cookies.get("access-token") || "");
        formData.append("client", Cookies.get("client") || "");
        formData.append("uid", Cookies.get("uid") || "");
    
        fetch(url, {
            method : 'DELETE',
            headers: {
                "access-token" : Cookies.get("access-token") || "",
                "client" : Cookies.get("client") || "",
                "uid" : Cookies.get("uid") || ""
            },
            body: formData
        }).then((response) => {
            return response.json();
        }).then((res) => {
            if (res.success) {
                Cookies.remove("uid");
                Cookies.remove("client");
                Cookies.remove("access-token");
            }
            setIsSignedIn(false);
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <nav className="bg-slate-700 sticky z-50 top-0 h-14">
            <div className="flex relative justify-center mt-2 mx-5">
                <button 
                    className="block md:hidden rounded p-1 mr-auto hover:bg-gray-800 bg-slate-500"
                    onClick={toggleSwitch}
                >
                    ...
                </button>
                <div className="text-4xl font-semibold uppercase">
                Bulletin Board
                </div>
                {!isSignedIn && 
                    <Link href={"/login"}>
                        <button className="hover:bg-gray-800 bg-slate-500 rounded p-1 ml-auto">
                            ログイン
                        </button>
                    </Link>
                }
                {isSignedIn && 
                    <button className="hover:bg-gray-800 bg-slate-500 rounded p-1 ml-auto" onClick={handleSignOut}>
                        ログアウト
                    </button>
                }

            </div>
        </nav>
    );
};
export default Navigationbar
