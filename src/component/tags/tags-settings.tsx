import { generateId } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import { useRefresher } from "../../data/util";
import IdSwitching from "../common/settings/id-switching";

export default function TagsSettings() {
    const { project } = usePageContext();
    const settings = project.tagsSettings;
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
                    project.tagsSettings.nextId = 0;
                    project.tags = new Map([...project.tags.values()].map(tag => {
                        const { id, next } = generateId(ty, project.tagsSettings.nextId);
                        project.tagsSettings.nextId = next;
                        tag.id = id;
                        return [id, tag]
                    }));
                }}
            />
        </div>
    );
}
