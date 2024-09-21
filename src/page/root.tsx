import { Outlet } from "react-router-dom";
import SideBar from "../component/side-bar";
import TitleBar from "../component/title-bar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Project } from "../data/model/project";

export default function Root() {
    const [project, setProject] = useState<Project | null>(null);

    return (
        <div className="w-full h-full font-mono text-light">
            <Toaster
                containerClassName="mt-6"
                toastOptions={{
                    className: "bg-hover-dark text-light"
                }}
            />
            <TitleBar />
            <div className="flex h-full gap-4 m-2">
                <SideBar projectLoaded={project != null} />
                <Outlet context={[project, setProject]} />
            </div>
        </div>
    );
}
