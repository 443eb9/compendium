import { useEffect } from "react";
import { addKeyboardEvent, removeKeyboardEvent } from "../data/keyboard";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";
import { serProject, usePageContext } from "../data/model/project";
import { localizeError } from "../data/localization";
import { t } from "i18next";

export default function ProjectSave() {
    const { project } = usePageContext();

    useEffect(() => {
        removeKeyboardEvent("s");
        addKeyboardEvent("s", (ev) => {
            console.log(project);
            if (ev.ctrlKey) {
                invoke("update_project", { newProject: serProject(project) })
                    .then(() => toast.success(t("ProjectUpdateSuccess")))
                    .catch((err) => toast.error(localizeError(err, t)));
            }
        });
    });

    return "";
}
