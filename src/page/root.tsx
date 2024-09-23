import { Outlet } from "react-router-dom";
import SideBar from "../component/side-bar";
import TitleBar from "../component/title-bar";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Project } from "../data/model/project";
import { invoke } from "@tauri-apps/api/core";
import { initKeyboardEvent } from "../data/keyboard";

export default function Root() {
    const [project, setProject] = useState<Project | null>(null);
    const pageContainer = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        if (isMounted) {
            return;
        }

        if (project == null) {
            invoke("fetch_project")
                .then((proj) => {
                    const converted = proj as Project;
                    setProject({
                        ...converted,
                        assets: new Map(Object.entries(converted.assets)),
                        items: new Map(Object.entries(converted.items)),
                    });

                })
                .catch(() => { });
        }

        setMounted(true);
        setContainerWidth(pageContainer.current?.clientWidth ?? 0);
        initKeyboardEvent();

        addEventListener("resize", () => {
            setContainerWidth(pageContainer.current?.clientWidth ?? 0);
        });
    });

    return (
        <div className="font-mono text-light" style={{ height: "calc(100% - 32px)" }}>
            <Toaster
                position="top-right"
                containerClassName="mt-6"
                toastOptions={{
                    className: "bg-darker text-light"
                }}
            />
            <TitleBar className="h-8" />
            <div className="flex h-full gap-4 p-2">
                <SideBar projectLoaded={project != null} />
                <div className="w-full overflow-y-auto" ref={pageContainer}>
                    <Outlet context={{
                        project: project,
                        setProject: (proj: Project | null) => { console.log(proj); setProject(proj); },
                        containerWidth: containerWidth,
                    }} />
                </div>
            </div>
        </div>
    );
}
