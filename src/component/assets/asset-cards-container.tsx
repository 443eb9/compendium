import { AssetData } from "../../data/model/assets";
import { Id } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import ContainerTemplate from "../common/templates/container-template";
import AssetCard from "./asset-card";

export default function AssetCardsContainer() {
    const { project, setProject } = usePageContext();

    function updateCallback(id: Id) {
        return (newAsset: AssetData) => {
            project.assets.set(id, newAsset);
            setProject(project);
        };
    }

    return (
        <ContainerTemplate>
            {
                [...project.assets.values()].map((asset, i) =>
                    <AssetCard key={i} asset={asset} updateCallback={updateCallback(asset.id)} />
                )
            }
        </ContainerTemplate>
    );
}
