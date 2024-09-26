import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";
import { useRefresher } from "../../data/util";

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
        </div>
    );
}
