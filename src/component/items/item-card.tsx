import { ItemData } from "../../data/model/items";
import { usePageContext } from "../../data/model/project";
import AssetPreview from "../assets/preview/asset-preview";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { Input } from "../common/input";
import Button from "../common/button";
import TagsDisplay from "../common/tagging/tags-display";
import { useState } from "react";
import { t } from "i18next";
import { Id } from "../../data/model/common";

export default function ItemCard({
    item, browsing, setBrowsing
}: {
    item: ItemData,
    browsing: Id | null,
    setBrowsing: (id: Id | null) => void
}) {
    const { project, setProject } = usePageContext();
    const curItem = project.items.get(item.id);
    if (!curItem) return "";

    const [_, setRefresh] = useState(0);
    function updateCurItem(item: ItemData) {
        project.items.set(item.id, item);
        setProject(project);
        setRefresh(r => r++);
    }

    return (
        <CardTemplate>
            <AssetPreview asset={project.assets.get(curItem.reference)} />
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input value={curItem.id.toString()} readOnly />
                </ListElement>
                <ListElement label={t("Reference")}>
                    <Input value={curItem.reference.toString()} onChange={(ev) => {
                        updateCurItem({
                            ...curItem,
                            reference: ev.target.value,
                        });
                    }} />
                    <Button className="h-full w-24 ml-2" onClick={() => {
                        setBrowsing(browsing != null && browsing == item.id ? null : item.id);
                    }}>
                        {t(browsing == item.id ? "Close" : "Browse")}
                    </Button>
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input value={curItem.name} onChange={(ev) => {
                        updateCurItem({
                            ...curItem,
                            name: ev.target.value,
                        });
                    }} />
                </ListElement>
                <ListElement label={t("Desc")}>
                    <Input value={curItem.desc} onChange={(ev) => {
                        updateCurItem({
                            ...curItem,
                            desc: ev.target.value,
                        });
                    }} />
                </ListElement>
                <ListElement className="h-auto" label={t("Tags")}>
                    <TagsDisplay tags={curItem.tags} setTags={(newTags) => {
                        const target = project.items.get(curItem.id);
                        if (target) {
                            target.tags = newTags;
                        }
                    }} />
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
