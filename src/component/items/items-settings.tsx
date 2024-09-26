import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";
import { useRefresher } from "../../data/util";

export default function ItemSettings() {
    const { project } = usePageContext();
    const settings = project.itemsSettings;
    const update = useRefresher();

    return (
        <div className="">
            <IdSwitching ty={settings.idType} setIdType={(ty) => {
                settings.idType = ty;
                update();
            }} />
        </div>
    )
}
