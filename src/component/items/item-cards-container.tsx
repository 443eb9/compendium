import { Id } from "../../data/model/common";
import { ItemData } from "../../data/model/items";
import { usePageContext } from "../../data/model/project";
import ContainerTemplate from "../common/templates/container-template";
import ItemCard from "./item-card";

export default function ItemCardsContainer() {
    const { project, setProject } = usePageContext();

    function updateCallback(id: Id) {
        return (newItem: ItemData) => {
            project.items.set(id, newItem);
            setProject(project);
        };
    }

    return (
        <ContainerTemplate>
            {
                [...project.items.values()].map((item, i) =>
                    <ItemCard key={i} item={item} updateCallback={updateCallback(item.id)} />
                )
            }
        </ContainerTemplate>
    );
}
