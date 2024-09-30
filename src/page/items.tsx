import PageTemplate from "../component/common/templates/page-template";
import { usePageContext } from "../data/model/project";
import { IoAdd } from "react-icons/io5";
import { generateId } from "../data/model/common";
import { useNavigate } from "react-router-dom";
import { useRefresher } from "../data/util";

export default function ItemsPage() {
    const context = usePageContext();
    const { project } = context;
    const update = useRefresher();

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createItem() {
        const { id, next } = generateId(
            project.itemsSettings.idType,
            project.itemsSettings.nextId,
        );

        project.items.set(id, {
            id: id,
            reference: "",
            name: "",
            desc: "",
            tags: new Set(),
        });
        project.itemsSettings.nextId = next;
        update();
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
