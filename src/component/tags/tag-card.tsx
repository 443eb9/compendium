import { TagData } from "../../data/model/tags";
import { Input } from "../common/input";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";

export default function TagCard({
    tag, updateCallback
}: {
    tag: TagData, updateCallback: (tag: TagData) => void
}) {
    return (
        <CardTemplate>
            <CardListTemplate>
                <ListElement label="">
                    <Input defaultValue={tag.id.toString()} readOnly />
                </ListElement>
                <ListElement label="">
                    <Input defaultValue={tag.name} />
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
