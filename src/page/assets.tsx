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
import ProjectSave from "../component/project-save";
import OperationBar from "../component/common/operation-bar";

export default function AssetsPage() {
    const { t } = useTranslation();
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
        <div className="flex flex-col gap-2">
            <ProjectSave />
            <OperationBar>
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
            </OperationBar>
            <div>
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
                            cols={cols}
                        />
                }
            </div>
        </div>
    );
}
