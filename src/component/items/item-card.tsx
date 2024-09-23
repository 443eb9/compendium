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

export default function ItemCard({
    item, updateCallback
}: {
    item: ItemData, updateCallback: (item: ItemData) => void
}) {
    const { project } = usePageContext();
    const [curItem, setCurItem] = useState(item);
    function updateCurItem(item: ItemData) {
        setCurItem(item);
        updateCallback(item);
    }

    return (
        <CardTemplate>
            <AssetPreview asset={project.assets.get(curItem.reference)} />
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input defaultValue={curItem.id.toString()} readOnly />
                </ListElement>
                <ListElement label={t("Reference")}>
                    <Input defaultValue={curItem.reference.toString()} onChange={(ev) => {
                        updateCurItem({
                            ...curItem,
                            reference: ev.target.value,
                        });
                    }} />
                    <Button className="h-full px-3 ml-2">{t("Browse")}</Button>
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input defaultValue={curItem.name} onChange={(ev) => {
                        updateCurItem({
                            ...curItem,
                            name: ev.target.value,
                        })
                    }} />
                </ListElement>
                <ListElement label={t("Desc")}>
                    <Input defaultValue={curItem.desc} onChange={(ev) => {
                        updateCurItem({
                            ...curItem,
                            desc: ev.target.value,
                        })
                    }} />
                </ListElement>
                <ListElement label={t("Tags")}>
                    <TagsDisplay tags={curItem.tags} setTags={(newTags) => {
                        const target = project.items.get(curItem.id);
                        if (target) {
                            target.tags = new Set(newTags);
                        }
                    }} />
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
