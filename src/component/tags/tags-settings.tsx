import { usePageContext } from "../../data/model/project";
import { useRefresher } from "../../data/util";
import IdSwitching from "../common/settings/id-switching";

export default function TagsSettings() {
    const { project } = usePageContext();
    const settings = project.tagsSettings;
    const update = useRefresher();

    return (
        <div className="">
            <IdSwitching ty={settings.idType} setIdType={ty => {
                settings.idType = ty;
                update();
            }}></IdSwitching>
        </div>
    );
}
