import { IoAdd } from "react-icons/io5";
import PageTemplate from "../component/common/templates/page-template";
import { generateId } from "../data/model/common";
import { usePageContext } from "../data/model/project";
import { useRefresher } from "../data/util";

export default function TreesPage() {
    const { project } = usePageContext();
    const update = useRefresher();

    function createTree() {
        const { id, next } = generateId(
            project.treesSettings.treeIdType,
            project.treesSettings.treeNextId,
        );

        project.trees.set(id, {
            id: id,
            name: "",
            nodes: [],
            edges: [],
            viewOffset: [0, 0]
        });
        project.treesSettings.treeNextId = next;
        project.treesSettings.nodeNextId.set(id, 0);
        update();
    }

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateTree",
                    icon: <IoAdd className="text-2xl" />,
                    className: "",
                    onClick: createTree,
                }
            ]}
        />
    );
}
