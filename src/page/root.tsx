import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../component/side-bar";
import TitleBar from "../component/title-bar";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { deserProject, Project } from "../data/model/project";
import { invoke } from "@tauri-apps/api/core";
import { initKeyboardEvent } from "../data/keyboard";
import { ErrorBoundary } from "react-error-boundary";

export default function Root() {
    const [project, setProject] = useState<Project | null>(null);
    const pageContainer = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState([0, 0]);
    const [isMounted, setMounted] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (isMounted) {
            return;
        }

        if (project == null) {
            invoke("fetch_project")
                .then((proj) => setProject(deserProject(proj as string)))
                .catch(() => { });
        }

        setMounted(true);
        // subtract operation bar height
        setContainerSize([pageContainer.current?.clientWidth ?? 0, (pageContainer.current?.clientHeight ?? 56) - 56]);
        initKeyboardEvent();

        addEventListener("resize", () => {
            setContainerSize([pageContainer.current?.clientWidth ?? 0, (pageContainer.current?.clientHeight ?? 56) - 56]);
        });
        nav("/home");
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
                <ErrorBoundary fallback={<div></div>}>
                    <div className="w-full overflow-x-hidden overflow-y-auto" ref={pageContainer}>
                        <Outlet context={{
                            project: project,
                            setProject: (proj: Project | null) => { console.log(proj); setProject(proj); },
                            containerSize: containerSize,
                        }} />
                    </div>
                </ErrorBoundary>
            </div>
        </div>
    );
}
