import { Item } from "../../data/model/items";
import { PageContext } from "../../data/model/project";
import ItemCard from "./item-card";

export default function ItemCardsContainer({ context }: { context: PageContext }) {
    const { project, setProject } = context;

    function updateCallback(id: string) {
        return (newItem: Item) => {
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
