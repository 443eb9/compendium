import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";
import { useRefresher } from "../../data/util";
import RadioButtonSection from "../common/radio-button-section";
import { PathType } from "../../data/model/assets";
import LabelledButton from "../common/labelled-button";
import { IoRefresh } from "react-icons/io5";
import { generateId } from "../../data/model/common";
import { invoke } from "@tauri-apps/api/core";

export default function AssetsSettings() {
    const { project } = usePageContext();
    const settings = project.assetsSettings;
    const update = useRefresher();

    return (
        <div className="flex flex-col gap-2">
            <IdSwitching
                ty={settings.idType}
                setIdType={ty => {
                    settings.idType = ty;
                    update();
                }}
                regenerate={ty => {
                    project.assetsSettings.nextId = 0;
                    project.assets = new Map([...project.assets.values()].map(asset => {
                        const { id, next } = generateId(ty, project.assetsSettings.nextId);
                        project.assetsSettings.nextId = next;
                        asset.id = id;
                        return [id, asset]
                    }));
                }}
            />
            <RadioButtonSection
                title="PathType"
                options={[PathType.Absolute, PathType.Relative]}
                labels={[PathType[PathType.Absolute], PathType[PathType.Relative]]}
                callback={(op) => {
                    settings.pathType = op;
                    update();
                }}
                enabled={settings.pathType}
            >
                <div className="flex">
                    <LabelledButton label="Regenerate" onClick={() => {
                        project.assets.forEach(async asset => {
                            switch (project.assetsSettings.pathType) {
                                case PathType.Absolute:
                                    asset.path = await invoke("absolutize_path", { path: asset.path, base: project.path });
                                    break;
                                case PathType.Relative:
                                    asset.path = await invoke("relativize_path", { path: asset.path, base: project.path });
                                    break;
                            }
                        })
                    }} >
                        <IoRefresh className="text-lg" />
                    </LabelledButton>
                </div>
            </RadioButtonSection>
        </div>
    );
}
