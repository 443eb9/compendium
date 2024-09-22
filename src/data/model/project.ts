import { useOutletContext } from "react-router-dom";
import { Asset, AssetSettingsData } from "./assets";

export type Project = {
    path: string,
    name: string,
    assets: Asset[],
    assetSettings: AssetSettingsData,
}

export type PageContext = {
    project: Project,
    setProject: (proj: Project) => void,
    containerWidth: number,
}

export function usePageContext() {
    return useOutletContext<PageContext>();
}
