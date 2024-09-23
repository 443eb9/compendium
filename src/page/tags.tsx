import { IoAdd } from "react-icons/io5";
import PageTemplate from "../component/common/templates/page-template";
import { usePageContext } from "../data/model/project";
import { generateId } from "../data/model/common";

export default function TagsPage() {
    const { project, setProject } = usePageContext();

    function createTag() {
        const { id, next } = generateId(
            project.tagsSettings.idType,
            project.tagsSettings.nextId,
        );

        setProject({
            ...project,
            tags: new Map([
                ...project.tags,
                [
                    id,
                    {
                        id: id,
                        name: "",
                        desc: "",
                        color: "#ffffff",
                    }
                ]
            ]),
            tagsSettings: {
                ...project.tagsSettings,
                nextId: next,
            }
        });
    };

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateTag",
                    className: "",
                    icon: <IoAdd className="text-2xl" />,
                    onClick: () => createTag,
                }
            ]}
        />
    );
}
