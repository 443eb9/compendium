import { Outlet } from "react-router-dom";
import SideBar from "../component/side-bar";
import TitleBar from "../component/title-bar";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Project } from "../data/model/project";
import { invoke } from "@tauri-apps/api/core";

export default function Root() {
    const [project, setProject] = useState<Project | null>(null);
    const pageContainer = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setContainerWidth(pageContainer.current?.parentElement?.clientWidth ?? 0);
    });

    useEffect(() => {
        if (isMounted) {
            return;
        }
        if (project == null) {
            invoke("fetch_project")
                .then((project) => setProject(project as Project))
                .catch(() => { });
        }
        setMounted(true);
    });

    return (
        <div className="w-full h-full font-mono text-light">
            <Toaster
                containerClassName="mt-6"
                toastOptions={{
                    className: "bg-darker text-light"
                }}
            />
            <TitleBar />
            <div className="flex flex-grow gap-4 m-2">
                <SideBar projectLoaded={project != null} />
                <div className="w-full overflow-y-auto" ref={pageContainer}>
                    <Outlet context={{
                        project: project,
                        setProject: (proj: Project) => {
                            console.log(proj);
                            setProject(proj);
                        },
                        containerWidth: containerWidth,
                    }} />
                </div>
            </div>
        </div>
    );
}
