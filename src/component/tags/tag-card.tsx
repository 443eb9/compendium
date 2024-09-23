import { t } from "i18next";
import { TagData } from "../../data/model/tags";
import { Input } from "../common/input";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export default function TagCard({
    tag, updateCallback
}: {
    tag: TagData, updateCallback: (tag: TagData) => void
}) {
    const [isPickingColor, setPickingColor] = useState(false);
    const [curTag, setCurTag] = useState(tag);
    function updateCurTag(tag: TagData) {
        setCurTag(tag);
        updateCallback(tag);
    }

    return (
        <CardTemplate>
            <CardListTemplate>
                <ListElement label={t("Id")}>
                    <Input defaultValue={curTag.id.toString()} readOnly />
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input defaultValue={curTag.name} onChange={(ev) => {
                        updateCurTag({
                            ...curTag,
                            name: ev.target.value ?? "",
                        });
                    }} />
                </ListElement>
                <ListElement className="relative" label={t("Color")}>
                    <Input
                        className="hover:border-outline"
                        readOnly
                        onClick={() => { setPickingColor(!isPickingColor) }}
                        style={{
                            backgroundColor: curTag.color,
                        }}
                    />
                    {
                        isPickingColor &&
                        <HexColorPicker
                            style={{
                                position: "absolute",
                                left: "112px",
                                top: "44px",
                                zIndex: "100",
                            }}
                            color={curTag.color}
                            onChange={(newColor) => {
                                updateCurTag({
                                    ...curTag,
                                    color: newColor,
                                });
                            }}
                        />
                    }
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
