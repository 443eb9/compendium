import { ItemData } from "../../data/model/items";
import { usePageContext } from "../../data/model/project";
import AssetPreview from "../assets/preview/asset-preview";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { Input } from "../common/input";
import Button from "../common/button";
import TagsDisplay from "../common/tagging/tags-display";
import { t } from "i18next";
import { Id } from "../../data/model/common";
import { useRefresher } from "../../data/util";

export default function ItemCard({
    id, browsing, setBrowsing
}: {
    id: Id,
    browsing: Id | null,
    setBrowsing: (id: Id | null) => void
}) {
    const { project } = usePageContext();
    const item = project.items.get(id) as ItemData;
    const update = useRefresher();

    return (
        <CardTemplate>
            <AssetPreview asset={project.assets.get(item.reference)} />
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input value={item.id.toString()} readOnly />
                </ListElement>
                <ListElement label={t("Reference")}>
                    <Input value={item.reference.toString()} onChange={(ev) => {
                        item.reference = ev.target.value;
                        update();
                    }} />
                    <Button className="h-full w-24 ml-2" onClick={() => {
                        setBrowsing(browsing != null && browsing == item.id ? null : item.id);
                    }}>
                        {t(browsing == item.id ? "Close" : "Browse")}
                    </Button>
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input value={item.name} onChange={(ev) => {
                        item.name = ev.target.value;
                        update();
                    }} />
                </ListElement>
                <ListElement label={t("Desc")}>
                    <Input value={item.desc} onChange={(ev) => {
                        item.desc = ev.target.value;
                        update();
                    }} />
                </ListElement>
                <ListElement className="h-auto" label={t("Tags")}>
                    <TagsDisplay tags={item.tags} />
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
