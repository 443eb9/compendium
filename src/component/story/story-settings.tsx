import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";
import { useRefresher } from "../../data/util";
import { generateId } from "../../data/model/common";

export default function StorySettings() {
    const { project } = usePageContext();
    const settings = project.storiesSettings;
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
                    project.storiesSettings.nextId = 0;
                    project.stories = new Map([...project.stories.values()].map(story => {
                        const { id, next } = generateId(ty, project.storiesSettings.nextId);
                        project.storiesSettings.nextId = next;
                        story.id = id;
                        return [id, story]
                    }));
                }}
            />
        </div>
    )
}
