import { ReactElement } from "react";
import Navigationbar from "../Navigationbar/Navigationbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigationbar />
      <Sidebar />
      <main className="absolete ml-0 md:ml-72 min-h-screen">{children}</main>
    </div>
  );
};
export default Layout;
