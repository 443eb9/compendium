import { useState } from "react";
import { Id } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import { BrowsingPanel } from "../common/browsing/browsing-panel";
import ContainerTemplate from "../common/templates/container-template";
import ItemCard from "./item-card";
import { ItemData } from "../../data/model/items";

export default function ItemCardsContainer() {
    const { project } = usePageContext();
    const [browsing, setBrowsing] = useState<Id | null>(null);

    return (
        <ContainerTemplate>
            {
                [...project.items.values()].map((item, i) =>
                    <ItemCard
                        key={i}
                        id={item.id}
                        browsing={browsing}
                        setBrowsing={setBrowsing}
                    />
                )
            }
            <BrowsingPanel
                title="SelectAsset"
                options={browsing ? project.assets : null}
                setter={(op) => {
                    const item = project.items.get(browsing as Id) as ItemData;
                    item.reference = op;
                }}
                close={() => setBrowsing(null)}
            />
        </ContainerTemplate>
    );
}
