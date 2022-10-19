import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext, SidebarContext } from "../../pages/_app";
import { SidebarClassName } from "../Sidebar/Sidebar";
import { removeAuthCookies } from "../../lib/cookie";
import { signout as signout } from "../../lib/auth";

const Navigationbar = () => {

    const { sidebarStatus, setSidebarStatus } = useContext(SidebarContext);
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

    const toggleSwitch = () => {
        if (sidebarStatus == SidebarClassName.toggleOff) {
            setSidebarStatus(SidebarClassName.toggleOn);
        } else {
            setSidebarStatus(SidebarClassName.toggleOff);
        }
    }

    const handleSignOut = () => {
        const res = signout();
        res.then((result) => {
            if (result.success) {
                removeAuthCookies();
                setIsSignedIn(false);
            } else {
                console.log("サインアウトに失敗しました");
            }
        });
    }

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
                        <button className="hover:bg-slate-500 bg-slate-600 rounded p-1 ml-auto">
                            ログイン
                        </button>
                    </Link>
                }
                {isSignedIn &&
                    <button className="hover:bg-slate-500 bg-slate-600 rounded p-1 ml-auto" onClick={handleSignOut}>
                        ログアウト
                    </button>
                }

            </div>
        </nav>
    );
};
export default Navigationbar
