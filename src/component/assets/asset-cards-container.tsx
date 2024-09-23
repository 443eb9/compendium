import { AssetData } from "../../data/model/assets";
import { Id } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import AssetCard from "./asset-card";

export default function AssetCardsContainer() {
    const { project, setProject, containerWidth } = usePageContext();
    const cols = Math.floor(containerWidth / 500);

    function updateCallback(id: Id) {
        return (newAsset: AssetData) => {
            project.assets.set(id, newAsset);
            setProject(project);
        };
    }

    return (
        <div
            className="w-full h-full grid gap-2"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
            {
                [...project.assets.values()].map((asset, i) =>
                    <AssetCard key={i} asset={asset} updateCallback={updateCallback(asset.id)} />
                )
            }
        </div>
    );
}
