import { ItemData } from "../../data/model/items";
import { usePageContext } from "../../data/model/project";
import ItemCard from "./item-card";

export default function ItemCardsContainer() {
    const { project, setProject } = usePageContext();

    function updateCallback(id: string) {
        return (newItem: ItemData) => {
            project.items.set(id, newItem);
            setProject(project);
        };
    }

    return (
        <div className="">
            {
                [...project.items.values()].map((item, i) =>
                    <ItemCard key={i} item={item} updateCallback={updateCallback(item.id)} />
                )
            }
        </div>
    );
}
