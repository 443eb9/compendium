import { useNavigate } from "react-router-dom";
import PageTemplate from "../component/common/templates/page-template";
import { generateId, ReferenceType } from "../data/model/common";
import { usePageContext } from "../data/model/project";
import { IoAdd } from "react-icons/io5";
import { useRefresher } from "../data/util";

export default function StoriesPage() {
    const context = usePageContext();
    const { project } = context;
    const update = useRefresher();

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createStory() {
        const { id, next } = generateId(
            project.storiesSettings.idType,
            project.storiesSettings.nextId,
        );

        project.stories.set(id, {
            id: id,
            reference: "",
            refType: ReferenceType.Asset,
            title: "",
            body: "",
        });
        project.storiesSettings.nextId = next;
        update();
    }

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateStory",
                    icon: <IoAdd className="text-2xl" />,
                    className: "",
                    onClick: createStory,
                }
            ]}
        />
    );
}
