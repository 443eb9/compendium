import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";
import { useRefresher } from "../../data/util";
import RadioButtonSection from "../common/radio-button-section";
import { PathType } from "../../data/model/assets";

export default function AssetsSettings() {
    const { project } = usePageContext();
    const settings = project.assetsSettings;
    const update = useRefresher();

    return (
        <div>
            <IdSwitching ty={settings.idType} setIdType={ty => {
                settings.idType = ty;
                update();
            }} />
            <RadioButtonSection
                title="PathType"
                options={[PathType.Absolute, PathType.Relative]}
                labels={[PathType[PathType.Absolute], PathType[PathType.Relative]]}
                callback={(op) => {
                    settings.pathType = op;
                    update();
                }}
                enabled={settings.pathType}
            />
        </div>
    );
}
