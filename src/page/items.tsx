import PageTemplate from "../component/common/templates/page-template";
import { usePageContext } from "../data/model/project";
import { IoAdd } from "react-icons/io5";
import { generateId } from "../data/model/common";
import { useNavigate } from "react-router-dom";

export default function ItemsPage() {
    const context = usePageContext();
    const { project, setProject, containerSize: containerWidth } = context;

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createItem() {
        const { id, next } = generateId(
            project.itemsSettings.idType,
            project.itemsSettings.nextId,
        );

        setProject({
            ...project,
            items: new Map([
                ...project.items,
                [
                    id,
                    {
                        id: id,
                        reference: "",
                        name: "",
                        desc: "",
                        tags: new Set(),
                    }
                ]
            ]),
            itemsSettings: {
                ...project.itemsSettings,
                nextId: next,
            }
        });
    }

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateItem",
                    icon: <IoAdd className="text-2xl" />,
                    className: "",
                    onClick: createItem,
                }
            ]}
        />
    );
}
