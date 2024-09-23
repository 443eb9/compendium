import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { AssetType } from "../data/model/assets";
import { usePageContext } from "../data/model/project";
import { useNavigate } from "react-router-dom";
import { generateId } from "../data/model/common";
import PageTemplate from "../component/common/templates/page-template";

export default function AssetsPage() {
    const [settingsMode, setSettingsMode] = useState(false);
    const context = usePageContext();
    const { project, setProject } = context;

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createAsset() {
        const { id, next } = generateId(
            project.assetsSettings.idType,
            project.assetsSettings.nextId,
        );
        const newProject = {
            ...project,
            assets: new Map([
                ...project.assets,
                [
                    id,
                    {
                        ty: AssetType.Image,
                        id: id,
                        name: "",
                        path: "",
                    }
                ]
            ]),
            assetsSettings: {
                ...project.assetsSettings,
                nextId: next,
            }
        };
        setProject(newProject);
    }

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateAsset",
                    icon: <IoAdd className="text-2xl" />,
                    className: settingsMode ? "hidden" : "",
                    onClick: createAsset,
                }
            ]}
        />
    );
}
