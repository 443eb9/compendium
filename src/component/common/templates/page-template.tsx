import { IoClose, IoSettingsOutline } from "react-icons/io5";
import ProjectSave from "../../project-save";
import OperationBar, { Operation } from "../operation-bar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { usePageContext } from "../../../data/model/project";
import { useState } from "react";

export type OperationOverride = {
    override: Operation[],
    fullyOverride: boolean,
}

export default function PageTemplate({
    extraOperations = []
}: {
    extraOperations?: Operation[]
}) {
    const navFn = useNavigate();
    const [settingsMode, setSettingsMode] = useState(false);
    const location = useLocation();
    const [operationBar, setOperationBar] = useState(true);
    const [operationOverride, setOperationOverride] = useState<OperationOverride | null>(null);

    const settingOperations = [
        {
            label: "CloseSettings",
            icon: <IoClose className="text-xl" />,
            className: settingsMode ? "" : "hidden",
            onClick: () => {
                navFn(-1);
                setSettingsMode(false);
            },
        },
        {
            label: "Settings",
            icon: <IoSettingsOutline className="text-xl" />,
            className: settingsMode ? "hidden" : "",
            onClick: () => {
                navFn(location.pathname + "/settings");
                setSettingsMode(true);
            },
        },
    ];

    const inputOperations = extraOperations.map((op) => {
        return {
            ...op,
            className: op.className + (settingsMode ? " hidden" : ""),
        };
    });

    const operations = operationOverride
        ? operationOverride.fullyOverride ? operationOverride.override : operationOverride.override.concat(settingOperations)
        : inputOperations.concat(settingOperations);

    return (
        <div className="flex flex-col gap-2">
            <ProjectSave />
            <OperationBar
                visible={operationBar}
                operations={operations}
            />
            <div>
                <Outlet context={{
                    ...usePageContext(),
                    setOperationBar: setOperationBar,
                    setOperationOverride: setOperationOverride,
                }} />
            </div>
        </div>
    );
}
