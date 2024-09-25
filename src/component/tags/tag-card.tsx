import { t } from "i18next";
import { TagData } from "../../data/model/tags";
import { Input } from "../common/input";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { usePageContext } from "../../data/model/project";
import { Id } from "../../data/model/common";

export default function TagCard({
    id, picking, setPicking
}: {
    id: Id, picking: TagData | null, setPicking: (tag: TagData | null) => void
}) {
    const { project } = usePageContext();
    const tag = project.tags.get(id);
    if (!tag) { return; }

    function updateCurTag(tag: TagData) {
        project.tags.set(tag.id, tag);
    }

    return (
        <CardTemplate>
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input value={tag.id.toString()} readOnly />
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input value={tag.name} onChange={(ev) => {
                        updateCurTag({
                            ...tag,
                            name: ev.target.value ?? "",
                        });
                    }} />
                </ListElement>
                <ListElement className="relative" label={t("Color")}>
                    <Input
                        className="hover:border-outline"
                        value={(() => { console.log(tag.color); return tag.color; })()}
                        onClick={() => {
                            if (!picking || picking != tag) {
                                setPicking(tag);
                            } else if (picking == tag) {
                                setPicking(null);
                            }
                        }}
                        style={{
                            backgroundColor: tag.color,
                        }}
                        readOnly
                    />
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
