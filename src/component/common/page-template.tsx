import { IoClose, IoSettingsOutline } from "react-icons/io5";
import ProjectSave from "../project-save";
import OperationBar, { Operation } from "./operation-bar";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function PageTemplate({
    settings, page, extraOperations = [], settingsMode, setSettingsMode
}: {
    settings: ReactNode,
    page: ReactNode,
    extraOperations?: Operation[],
    settingsMode: boolean,
    setSettingsMode: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <div className="flex flex-col gap-2">
            <ProjectSave />
            <OperationBar
                operations={extraOperations.concat([
                    {
                        label: "CloseSettings",
                        icon: <IoClose className="text-xl" />,
                        className: settingsMode ? "" : "hidden",
                        onClick: () => setSettingsMode(false),
                    },
                    {
                        label: "Settings",
                        icon: <IoSettingsOutline className="text-xl" />,
                        className: settingsMode ? "hidden" : "",
                        onClick: () => setSettingsMode(true),
                    },
                ])}
            />
            <div>
                {settingsMode ? settings : page}
            </div>
        </div>
    );
}
