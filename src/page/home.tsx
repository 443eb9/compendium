import { AiOutlineFolderAdd, AiOutlineFolderOpen } from "react-icons/ai";
import Button from "../component/common/button";
import { open } from '@tauri-apps/plugin-dialog';
import { useTranslation } from "react-i18next";
import "../data/localization";

const openFolder = async () => {
    const file = await open({
        title: "Select project",
        directory: true,
    });
    console.log(file);
};

export default function HomePage({ openedProject, currentProjectPath, currentProjectName }: { openedProject: boolean, currentProjectPath?: string, currentProjectName?: string }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col w-full p-5 gap-8">
            <div className="flex flex-col w-full items-center gap-4">
                <img src="tauri.svg" alt="" className="max-w-14" />
                <div>
                    {t("welcomeText")}
                </div>
            </div>
            {
                openedProject
                    ? <div>You're now working in {currentProjectPath} ({currentProjectName})</div>
                    : <div className="flex flex-col w-48 gap-2 text-lg">
                        <Button className="flex items-center gap-2 p-1 pl-2" onClick={openFolder}>
                            <AiOutlineFolderOpen />
                            <h3>{t("openProject")}</h3>
                        </Button>
                        <Button className="flex items-center gap-2 p-1 pl-2" onClick={openFolder}>
                            <AiOutlineFolderAdd />
                            <h3>{t("createProject")}</h3>
                        </Button>
                    </div>
            }
        </div>
    );
}
