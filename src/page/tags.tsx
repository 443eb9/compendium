import { IoAdd } from "react-icons/io5";
import PageTemplate from "../component/common/templates/page-template";
import { usePageContext } from "../data/model/project";
import { generateId } from "../data/model/common";
import { randomColor, useRefresher } from "../data/util";

export default function TagsPage() {
    const { project } = usePageContext();
    const update = useRefresher();

    function createTag() {
        const { id, next } = generateId(
            project.tagsSettings.idType,
            project.tagsSettings.nextId,
        );

        project.tags.set(id, {
            id: id,
            name: "",
            desc: "",
            color: randomColor(),
        });
        project.tagsSettings.nextId = next;
        update();
    };

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateTag",
                    className: "",
                    icon: <IoAdd className="text-2xl" />,
                    onClick: createTag,
                }
            ]}
        />
    );
}
