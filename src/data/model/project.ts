import { useOutletContext } from "react-router-dom";
import { AssetData, AssetSettingsData } from "./assets";
import { Dispatch, SetStateAction } from "react";
import { ItemData, ItemsSettingsData } from "./items";
import { TagData, TagsSettingsData } from "./tags";
import { Id } from "./common";
import { StoryData, StorySettingsData } from "./story";

export type Project = {
    path: string,
    name: string,
    tags: Map<Id, TagData>,
    tagsSettings: TagsSettingsData,
    assets: Map<Id, AssetData>,
    assetsSettings: AssetSettingsData,
    items: Map<Id, ItemData>,
    itemsSettings: ItemsSettingsData,
    stories: Map<Id, StoryData>,
    storySettings: StorySettingsData,
}

export type PageContext = {
    project: Project,
    setProject: Dispatch<SetStateAction<Project | null>>,
    containerWidth: number,
}

export function usePageContext() {
    return useOutletContext<PageContext>();
}

// TODO is there any better way to handle the problem that Maps
//      and Sets cannot be (de)serialized directly?

export function serProject(project: Project) {
    console.log(project);
    let p = Object.fromEntries(Object.entries(project));
    // @ts-ignore
    p.items.forEach((item) => {
        // @ts-ignore
        item.tags = [...item.tags.values()];
    });
    // @ts-ignore
    p.assets = Object.fromEntries(p.assets);
    // @ts-ignore
    p.items = Object.fromEntries(p.items);
    // @ts-ignore
    p.tags = Object.fromEntries(p.tags);
    // @ts-ignore
    p.stories = Object.fromEntries(p.stories);
    return JSON.stringify(p);
}

export function deserProject(project: string) {
    console.log(project);
    let p = JSON.parse(project) as Project;
    p.assets = new Map(Object.entries(p.assets));
    p.items = new Map(Object.entries(p.items));
    p.tags = new Map(Object.entries(p.tags));
    p.items.forEach((i) => {
        i.tags = new Set([...i.tags.values()]);
    });
    p.stories = new Map(Object.entries(p.stories));
    return p;
}
