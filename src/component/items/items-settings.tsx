import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";
import { useRefresher } from "../../data/util";
import { generateId } from "../../data/model/common";

export default function ItemSettings() {
    const { project } = usePageContext();
    const settings = project.itemsSettings;
    const update = useRefresher();

    return (
        <div className="flex flex-col gap-2">
            <IdSwitching
                ty={settings.idType}
                setIdType={(ty) => {
                    settings.idType = ty;
                    update();
                }}
                regenerate={ty => {
                    project.itemsSettings.nextId = 0;
                    project.items = new Map([...project.items.values()].map(item => {
                        const { id, next } = generateId(ty, project.itemsSettings.nextId);
                        project.itemsSettings.nextId = next;
                        item.id = id;
                        return [id, item]
                    }));
                }}
            />
        </div>
    )
}
