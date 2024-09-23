import { IoClose, IoSettingsOutline } from "react-icons/io5";
import ProjectSave from "../../project-save";
import OperationBar, { Operation } from "../operation-bar";
import { Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { usePageContext } from "../../../data/model/project";
import { useState } from "react";

export default function PageTemplate({
    extraOperations = []
}: {
    extraOperations?: Operation[],
}) {
    const navFn = useNavigate();
    const [settingsMode, setSettingsMode] = useState(false);
    const location = useLocation();

    return (
        <div className="flex flex-col gap-2">
            <ProjectSave />
            <OperationBar
                operations={
                    extraOperations
                        .map((op) => {
                            return {
                                ...op,
                                className: op.className + (settingsMode ? " hidden" : ""),
                            };
                        })
                        .concat([
                            {
                                label: "CloseSettings",
                                icon: <IoClose className="text-xl" />,
                                className: settingsMode ? "" : "hidden",
                                onClick: () => {
                                    // TODO disgusting approach
                                    navFn(location.pathname.substring(0, location.pathname.length - "/settings".length));
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
                        ])
                }
            />
            <div>
                <Outlet context={usePageContext()} />
            </div>
        </div>
    );
}
