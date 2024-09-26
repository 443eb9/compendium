import { useState } from "react";
import { Id, Referenceable, ReferenceType } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import ContainerTemplate from "../common/templates/container-template";
import StoryCard from "./story-card";
import { BrowsingPanel } from "../common/browsing/browsing-panel";
import { StoryData } from "../../data/model/story";

export default function StoryCardsContainer() {
    const { project } = usePageContext();
    const [browsing, setBrowsing] = useState<Id | null>(null);
    const [options, setOptions] = useState<Map<Id, Referenceable> | null>(null);
    const [title, setTitle] = useState("");

    return (
        <ContainerTemplate>
            {
                [...project.stories.values()].map((story, i) =>
                    <StoryCard
                        key={i}
                        id={story.id}
                        browsing={browsing}
                        setBrowsing={(id) => {
                            setBrowsing(id);
                            if (!id) {
                                setOptions(null);
                                return;
                            }
                            switch (story.refType) {
                                case ReferenceType.Asset:
                                    setOptions(project.assets);
                                    setTitle("SelectAsset");
                                    break;
                                case ReferenceType.Item:
                                    setOptions(project.items);
                                    setTitle("SelectItem");
                                    break;
                                case ReferenceType.Structure:
                                    // TODO
                                    setTitle("SelectStructure");
                                    break;
                            }
                        }}
                    />
                )
            }
            <BrowsingPanel
                title={title}
                options={options}
                setter={id => {
                    const story = project.stories.get(browsing as Id) as StoryData;
                    story.reference = id;
                }}
                close={() => {
                    setBrowsing(null);
                    setOptions(null);
                }}
            />
        </ContainerTemplate>
    );
}
