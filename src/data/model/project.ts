import { useOutletContext } from "react-router-dom";
import { Asset, AssetSettingsData } from "./assets";
import { Dispatch, SetStateAction } from "react";

export type Project = {
    path: string,
    name: string,
    assets: Asset[],
    assetSettings: AssetSettingsData,
}

export type PageContext = {
    project: Project,
    setProject: Dispatch<SetStateAction<Project | null>>,
    containerWidth: number,
}

export function usePageContext() {
    return useOutletContext<PageContext>();
}
