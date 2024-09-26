import { t } from "i18next";
import { Id, ReferenceType } from "../../data/model/common";
import { StoryData } from "../../data/model/story";
import AssetPreview from "../assets/preview/asset-preview";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { Input } from "../common/input";
import { usePageContext } from "../../data/model/project";
import DropdownSection from "../common/dropdown-section";
import Button from "../common/button";
import TextArea from "../common/text-area";
import { useRefresher } from "../../data/util";

export default function StoryCard({
    id, browsing, setBrowsing
}: {
    id: Id,
    browsing: Id | null,
    setBrowsing: (id: Id | null) => void
}) {
    const { project } = usePageContext();
    const story = project.stories.get(id) as StoryData;
    const update = useRefresher();

    function getPreview() {
        switch (story.refType) {
            case ReferenceType.Asset:
                return project.assets.get(story.reference);
            case ReferenceType.Item:
                const item = project.items.get(story.reference);
                if (item) return project.assets.get(item.id);
                return undefined;
            case ReferenceType.Structure:
            // TODO
        }
    }

    return (
        <CardTemplate>
            {
                story.reference == ""
                    ? ""
                    : <AssetPreview asset={getPreview()} />
            }
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input value={story.id} readOnly />
                </ListElement>
                <ListElement label={t("Reference")}>
                    <Input value={story.reference} onChange={ev => {
                        story.reference = ev.target.value;
                        update();
                    }} />
                    <Button className="h-full w-24 ml-2" onClick={() => {
                        setBrowsing(browsing != null && browsing == story.id ? null : story.id);
                    }}>
                        {t(browsing == story.id ? "Close" : "Browse")}
                    </Button>
                </ListElement>
                <ListElement label={t("RefType")}>
                    <DropdownSection
                        options={[
                            ReferenceType.Asset,
                            ReferenceType.Item,
                            ReferenceType.Structure,
                        ]}
                        labels={[
                            ReferenceType[ReferenceType.Asset],
                            ReferenceType[ReferenceType.Item],
                            ReferenceType[ReferenceType.Structure],
                        ]}
                        defaultValue={story.refType}
                        onChange={ty => {
                            if (ty != story.refType) {
                                story.refType = ty;
                                story.reference = "";
                                setBrowsing(null);
                                update();
                            }
                        }}
                    />
                </ListElement>
                <ListElement label={t("Title")}>
                    <Input value={story.title} onChange={ev => {
                        story.title = ev.target.value;
                        update();
                    }} />
                </ListElement>
                <ListElement className="h-auto" label={t("Body")}>
                    <TextArea
                        className="h-24 resize-none"
                        value={story.body}
                        onChange={ev => {
                            story.body = ev.target.value;
                            update();
                        }}
                    ></TextArea>
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
