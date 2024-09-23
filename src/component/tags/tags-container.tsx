import { Id } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import { TagData } from "../../data/model/tags";
import TagCard from "./tag-card";

export default function TagsContainer() {
    const { project, setProject } = usePageContext();
    function updateCallback(id: Id) {
        return (tag: TagData) => {
            project.tags.set(id, tag);
            setProject(project);
        };
    }

    return (
        <div className="">
            {
                [...project.tags.values()].map((tag, i) =>
                    <TagCard key={i} tag={tag} updateCallback={updateCallback(tag.id)} />
                )
            }
        </div>
    );
}
