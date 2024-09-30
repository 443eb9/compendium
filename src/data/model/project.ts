import { useOutletContext } from "react-router-dom";
import { AssetData, AssetSettingsData } from "./assets";
import { Dispatch, SetStateAction } from "react";
import { ItemData, ItemsSettingsData } from "./items";
import { TagData, TagsSettingsData } from "./tags";
import { Id, IdType } from "./common";
import { StoryData, StorySettingsData } from "./story";
import { TreeData, TreeSettingsData } from "./trees";
import { OperationOverride } from "../../component/common/templates/page-template";

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
    storiesSettings: StorySettingsData,
    trees: Map<Id, TreeData>,
    treesSettings: TreeSettingsData,
}

export type SerializableProject = {
    path: string,
    name: string,
    tags: Object,
    tagsSettings: TagsSettingsData,
    assets: Object,
    assetsSettings: AssetSettingsData,
    items: Object,
    itemsSettings: ItemsSettingsData,
    stories: Object,
    storiesSettings: StorySettingsData,
    trees: Object,
    treesSettings: {
        treeIdType: IdType,
        treeNextId: number,
        nodeIdType: IdType,
        nodeNextId: Object,
    },
}

export type PageContext = {
    project: Project,
    setProject: Dispatch<SetStateAction<Project | null>>,
    containerSize: [number, number],
    setOperationBar: Dispatch<SetStateAction<boolean>> | null,
    setOperationOverride: Dispatch<SetStateAction<OperationOverride | null>>,
}

export function usePageContext() {
    return useOutletContext<PageContext>();
}

// TODO is there any better way to handle the problem that Maps
//      and Sets cannot be (de)serialized directly?

export function serProject(project: Project) {
    console.log(project);
    const p = {} as Project;
    Object.assign(p, project);
    let serp = p as SerializableProject;
    serp.assets = Object.fromEntries(p.assets.entries());
    serp.tags = Object.fromEntries(p.tags.entries());
    serp.stories = Object.fromEntries(p.stories.entries());
    serp.trees = Object.fromEntries(p.trees.entries());

    const items = [...p.items.entries()].map(val => {
        return [
            val[0],
            {
                ...val[1],
                tags: [...val[1].tags.values()],
            }
        ];
    });
    serp.items = Object.fromEntries(items);
    serp.treesSettings = {
        ...p.treesSettings,
        nodeNextId: Object.fromEntries(p.treesSettings.nodeNextId),
    }

    return JSON.stringify(serp);
}

export function deserProject(project: string) {
    console.log(project);
    let serp = JSON.parse(project) as SerializableProject;
    let p = serp as Project;
    p.assets = new Map(Object.entries(serp.assets));
    p.items = new Map(Object.entries(serp.items).map(obj =>
        [obj[0], {
            ...obj[1],
            tags: new Set(obj[1].tags),
        } as ItemData]
    ));
    p.tags = new Map(Object.entries(serp.tags));
    p.stories = new Map(Object.entries(serp.stories));
    p.trees = new Map(Object.entries(serp.trees));

    p.treesSettings.nodeNextId = new Map(Object.entries(serp.treesSettings.nodeNextId));

    return p;
}
