import { IoAdd } from "react-icons/io5";
import PageTemplate from "../component/common/templates/page-template";
import { generateId } from "../data/model/common";
import { usePageContext } from "../data/model/project";

export default function TreesPage() {
    const { project, setProject } = usePageContext();

    function createTree() {
        const { id, next } = generateId(
            project.treesSettings.treeIdType,
            project.treesSettings.treeNextId,
        );
        project.treesSettings.nodeNextId.set(id, 0);

        setProject({
            ...project,
            trees: new Map([
                ...project.trees,
                [
                    id,
                    {
                        id: id,
                        name: "",
                        nodes: [],
                        edges: [],
                        viewOffset: [0, 0]
                    }
                ]
            ]),
            treesSettings: {
                ...project.treesSettings,
                treeNextId: next,
            }
        });
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
