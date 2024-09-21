import { AiOutlineFolderAdd, AiOutlineFolderOpen } from "react-icons/ai";
import Button from "../component/common/button";
import { open } from '@tauri-apps/plugin-dialog';
import { useTranslation } from "react-i18next";
import "../data/localization";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";
import { Project } from "../data/model/project";
import { useEffect, useState } from "react";

function createProject(t: any, setProject: any) {
    return async () => {
        const file = await open({
            title: "Select project root",
            directory: true,
        });

        if (file == null) {
            return;
        }

        invoke("create_project", { path: file })
            .then(() => {
                toast.success(t("projectCreateSuccess"));
                invoke("fetch_project")
                    .then((project) => setProject(project as Project))
                    .catch((err) => toast.error(t(err)));
            })
            .catch((err) => toast.error(t(err)));
    };
}

function openProject(t: any, setProject: any) {
    return async () => {
        const file = await open({
            title: "Select project root",
            directory: true,
        });

        if (file == null) {
            return;
        }

        console.log(file);

        invoke("open_project", { path: file })
            .then(() => {
                toast.success(t("projectOpenSuccess"));
                invoke("fetch_project")
                    .then((project) => setProject(project as Project))
                    .catch((err) => toast.error(t(err)));
            })
            .catch((err) => toast.error(err));
    };
}

function closeProject(t: any, setProject: any) {
    return async () => {
        invoke("close_project")
            .then(() => {
                setProject(null);
                toast.success(t("projectCloseSuccess"));
            })
            .catch((err) => toast.error(t(err)));
    }
}

export default function HomePage() {
    const { t } = useTranslation();
    const [project, setProject] = useState<Project | null>(null);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        invoke("fetch_project")
            .then((project) => setProject(project as Project))
            .catch(() => { });
        setMounted(true);
    });

    return (
        <div className="flex flex-col w-full p-5 gap-8">
            <div className="flex flex-col w-full items-center gap-4">
                <img src="tauri.svg" alt="" className="max-w-14" />
                <div>
                    {t("welcomeText")}
                </div>
            </div>
            {
                isMounted
                    ? (
                        project != null
                            ? <div className="flex flex-col gap-1 text-lg font-bold">
                                <div className="italic">{project.name}</div>
                                <div className="italic">At {project.path}</div>
                                <Button className="flex items-center gap-2 p-1 pl-2 w-48" onClick={closeProject(t, setProject)}>
                                    <AiOutlineFolderAdd />
                                    <h3>{t("closeProject")}</h3>
                                </Button>
                            </div>
                            : <div className="flex flex-col w-48 gap-2 text-lg">
                                <Button className="flex items-center gap-2 p-1 pl-2" onClick={openProject(t, setProject)}>
                                    <AiOutlineFolderOpen />
                                    <h3>{t("openProject")}</h3>
                                </Button>
                                <Button className="flex items-center gap-2 p-1 pl-2" onClick={createProject(t, setProject)}>
                                    <AiOutlineFolderAdd />
                                    <h3>{t("createProject")}</h3>
                                </Button>
                            </div>
                    )
                    : ""
            }
        </div>
    );
}
