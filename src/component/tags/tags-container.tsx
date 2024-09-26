import { usePageContext } from "../../data/model/project";
import ContainerTemplate from "../common/templates/container-template";
import TagCard from "./tag-card";
import { useState } from "react";
import { TagData } from "../../data/model/tags";
import ColorPicker from "../common/browsing/color-picker";

export default function TagsContainer() {
    const { project } = usePageContext();
    const [picking, setPicking] = useState<TagData | null>(null);

    return (
        <ContainerTemplate>
            {
                [...project.tags.values()].map((tag, i) =>
                    <TagCard key={i} id={tag.id} picking={picking} setPicking={setPicking} />
                )
            }
            {
                picking &&
                <ColorPicker
                    opened={picking != null}
                    setter={(col) => {
                        if (!picking) return;
                        picking.color = col;
                    }}
                    defaultValue={picking.color}
                    close={() => setPicking(null)}
                />
            }
        </ContainerTemplate>
    );
}
