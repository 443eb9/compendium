import { usePageContext } from "../../data/model/project";
import ContainerTemplate from "../common/templates/container-template";
import TreeCard from "./tree-card";

export default function TreesContainer() {
    const { project } = usePageContext();

    return (
        <ContainerTemplate>
            {
                [...project.trees.keys()].map((tree, i) =>
                    <TreeCard key={i} id={tree} />
                )
            }
        </ContainerTemplate>
    );
}
