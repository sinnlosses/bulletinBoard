import React, { useContext } from "react";
import { SidebarContext } from "../../pages/_app";
import { SidebarClassName } from "../Sidebar/Sidebar";

const Navigationbar = () => {

    const {sidebarStatus, setSidebarStatus} = useContext(SidebarContext);

    const toggleSwitch = () => {
        if (sidebarStatus == SidebarClassName.toggleOff){
            setSidebarStatus(SidebarClassName.toggleOn);
        } else {
            setSidebarStatus(SidebarClassName.toggleOff);
        }
    }
    return (
        <nav className="bg-slate-700 sticky z-50 top-0 h-14">
            <div className="flex relative justify-center mt-2 mx-5">
                <div className="md:absolute md:left-0 text-4xl font-semibold uppercase">
                Bulletin Board
                </div>
                <button 
                    className="block md:hidden absolute right-0 rounded hover:bg-gray-900"
                    onClick={toggleSwitch}
                >
                </button>
            </div>
        </nav>
    );
};
export default Navigationbar
