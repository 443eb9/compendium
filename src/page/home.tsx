import { AiOutlineFolderAdd, AiOutlineFolderOpen } from "react-icons/ai";
import Button from "../component/common/button";
import { open } from '@tauri-apps/plugin-dialog';
import "../data/localization";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";
import { deserProject, serProject, usePageContext } from "../data/model/project";
import { localizeError } from "../data/localization";
import { t } from "i18next";

export default function HomePage() {
    const { project, setProject } = usePageContext();

    async function createProject() {
        const file = await open({
            title: "Select project root",
            directory: true,
        });

        if (file == null) {
            return;
        }

        invoke("create_project", { path: file })
            .then(() => {
                toast.success(t("ProjectCreateSuccess"));
                invoke("fetch_project")
                    .then((proj) => setProject(deserProject(JSON.stringify(proj))))
                    .catch((err) => toast.error(t(err)));
            })
            .catch((err) => toast.error(localizeError(err, t)));
    }

    async function openProject() {
        const file = await open({
            title: "Select project root",
            directory: true,
        });

        if (file == null) {
            return;
        }

        invoke("open_project", { path: file })
            .then(() => {
                toast.success(t("ProjectOpenSuccess"));
                invoke("fetch_project")
                    .then((proj) => setProject(deserProject(JSON.stringify(proj))))
                    .catch((err) => toast.error(t(err)));
            })
            .catch((err) => toast.error(localizeError(err, t)));
    }

    function closeProject() {
        invoke("update_project", { newProject: serProject(project) })
            .then(() => {
                toast.success(t("ProjectUpdateSuccess"));
                invoke("close_project")
                    .then(() => {
                        setProject(null);
                        toast.success(t("ProjectCloseSuccess"));
                    })
                    .catch((err) => toast.error(localizeError(err, t)));
                setProject(null);
            })
            .catch((err) => toast.error(localizeError(err, t)));
    }

    return (
        <div className="flex flex-col w-full p-5 gap-8">
            <div className="flex flex-col w-full items-center gap-4">
                <img src="tauri.svg" alt="" className="max-w-14" />
                <div>
                    {t("WelcomeText")}
                </div>
            </div>
            {
                project != null
                    ? <div className="flex flex-col gap-1 text-lg font-bold">
                        <div className="italic">{project.name}</div>
                        <Button className="flex items-center gap-2 p-1 pl-2 w-48" onClick={closeProject}>
                            <AiOutlineFolderAdd />
                            <h3>{t("CloseProject")}</h3>
                        </Button>
                    </div>
                    : <div className="flex flex-col w-48 gap-2 text-lg">
                        <Button className="flex items-center gap-2 p-1 pl-2" onClick={openProject}>
                            <AiOutlineFolderOpen />
                            <h3>{t("OpenProject")}</h3>
                        </Button>
                        <Button className="flex items-center gap-2 p-1 pl-2" onClick={createProject}>
                            <AiOutlineFolderAdd />
                            <h3>{t("CreateProject")}</h3>
                        </Button>
                    </div>
            }
        </div>
    );
}
