import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { AssetType } from "../data/model/assets";
import AssetCardsContainer from "../component/assets/asset-cards-container";
import AssetSettings from "../component/assets/asset-settings";
import { usePageContext } from "../data/model/project";
import { useNavigate } from "react-router-dom";
import { generateId } from "../data/model/common";
import PageTemplate from "../component/common/page-template";

export default function AssetsPage() {
    const [settingsMode, setSettingsMode] = useState(false);
    const context = usePageContext();
    const { project, setProject, containerWidth } = context;
    const cols = Math.floor(containerWidth / 500);

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function updateAssets() {
        const { id, next } = generateId(
            project.assetSettings.idType,
            project.assetSettings.nextId,
        );

        setProject({
            ...project,
            assets: [
                ...project.assets,
                {
                    ty: AssetType.Image,
                    id: id,
                    name: "",
                    path: ""
                }
            ],
            assetSettings: {
                ...project.assetSettings,
                nextId: next,
            }
        });
    }

    return (
        <PageTemplate
            settingsMode={settingsMode}
            setSettingsMode={setSettingsMode}
            settings={
                <AssetSettings
                    settings={project.assetSettings}
                    setSettings={
                        (s) => setProject({ ...project, assetSettings: s })
                    }
                />
            }
            page={
                <AssetCardsContainer
                    className="w-full h-full"
                    assets={project.assets}
                    context={context}
                    cols={cols}
                />
            }
            extraOperations={[
                {
                    label: "CreateAsset",
                    icon: <IoAdd className="text-2xl" />,
                    className: settingsMode ? "hidden" : "",
                    onClick: updateAssets,
                }
            ]}
        />
    );
}
