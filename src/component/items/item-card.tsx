import { useTranslation } from "react-i18next";
import { AssetData } from "../../data/model/assets";
import { ItemData } from "../../data/model/items";
import { usePageContext } from "../../data/model/project";
import AssetPreview from "../assets/preview/asset-preview";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { Input } from "../common/input";
import Button from "../common/button";
import TagsDisplay from "../common/tagging/tags-display";

export default function ItemCard({
    item, updateCallback
}: {
    item: ItemData, updateCallback: (item: ItemData) => void
}) {
    const { project, setProject } = usePageContext();
    const { t } = useTranslation();

    return (
        <CardTemplate>
            <AssetPreview asset={project.assets.get(item.reference)} />
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input defaultValue={item.id} readOnly />
                </ListElement>
                <ListElement label={t("Reference")}>
                    <Input defaultValue={item.reference} />
                    <Button className="h-full px-3 ml-2">{t("Browse")}</Button>
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input defaultValue={item.name} />
                </ListElement>
                <ListElement label={t("Tags")}>
                    <TagsDisplay tags={item.tags} setTags={(newTags) => {
                        const target = project.items.get(item.id);
                        if (target) {
                            target.tags = new Set(newTags);
                        }
                    }} />
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
