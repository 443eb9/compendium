import { useOutletContext } from "react-router-dom";
import { Asset, AssetSettingsData } from "./assets";
import { Dispatch, SetStateAction } from "react";
import { Item, ItemsSettingsData } from "./items";

export type Project = {
    path: string,
    name: string,
    assets: Map<string, Asset>,
    assetsSettings: AssetSettingsData,
    items: Map<string, Item>,
    itemsSettings: ItemsSettingsData,
}

export type PageContext = {
    project: Project,
    setProject: Dispatch<SetStateAction<Project | null>>,
    containerWidth: number,
}

export function usePageContext() {
    return useOutletContext<PageContext>();
}
