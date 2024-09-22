import { useTranslation } from "react-i18next";
import { IoAdd, IoClose, IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { AssetType } from "../data/model/assets";
import AssetCardsContainer from "../component/assets/asset-cards-container";
import AssetSettings from "../component/assets/asset-settings";
import LabelledButton from "../component/common/labelled-button";
import { usePageContext } from "../data/model/project";
import { useNavigate } from "react-router-dom";
import { generateId } from "../data/model/common";

export default function AssetsPage() {
    const { t } = useTranslation();
    const [settingsMode, setSettingsMode] = useState(false);
    const context = usePageContext();
    const { project, setProject } = context;

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function updateAssets() {
        console.log(generateId(
            project.assetSettings.idType,
            project.assetSettings.nextId,
        ));
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
        <div className="flex flex-col gap-2">
            <div className="sticky flex gap-2 h-12 py-1 top-0 backdrop-blur-md z-20 shadow-md">
                <LabelledButton
                    label={t("CreateAsset")}
                    className={settingsMode ? "hidden" : ""}
                    onClick={updateAssets}
                >
                    <IoAdd className="text-2xl" />
                </LabelledButton>
                <LabelledButton
                    label={t("CloseSettings")}
                    className={settingsMode ? "" : "hidden"}
                    onClick={() => setSettingsMode(false)}
                >
                    <IoClose className="text-xl" />
                </LabelledButton>
                <LabelledButton
                    label={t("Settings")}
                    className={settingsMode ? "hidden" : ""}
                    onClick={() => setSettingsMode(true)}
                >
                    <IoSettingsOutline className="text-xl" />
                </LabelledButton>
            </div>
            {
                settingsMode
                    ? <AssetSettings
                        settings={project.assetSettings}
                        setSettings={
                            (s) => setProject({ ...project, assetSettings: s })
                        }
                    />
                    : <AssetCardsContainer
                        className="w-full h-full"
                        assets={project.assets}
                        context={context}
                    />
            }
        </div>
    );
}
