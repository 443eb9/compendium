import { useOutletContext } from "react-router-dom";
import { AssetData, AssetSettingsData } from "./assets";
import { Dispatch, SetStateAction } from "react";
import { ItemData, ItemsSettingsData } from "./items";

export type Project = {
    path: string,
    name: string,
    assets: Map<string, AssetData>,
    assetsSettings: AssetSettingsData,
    items: Map<string, ItemData>,
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
