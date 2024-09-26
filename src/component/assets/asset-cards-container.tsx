import { usePageContext } from "../../data/model/project";
import ContainerTemplate from "../common/templates/container-template";
import AssetCard from "./asset-card";

export default function AssetCardsContainer() {
    const { project } = usePageContext();

    return (
        <ContainerTemplate>
            {
                [...project.assets.values()].map((asset, i) =>
                    <AssetCard key={i} id={asset.id} />
                )
            }
        </ContainerTemplate>
    );
}
