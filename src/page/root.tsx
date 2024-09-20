import { Outlet } from "react-router-dom";
import SideBar from "../component/side-bar";
import TitleBar from "../component/title-bar";

export default function Root() {
    return (
        <div className="w-full h-full font-mono text-light">
            <TitleBar />
            <div className="flex h-full gap-4 m-2">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
}
