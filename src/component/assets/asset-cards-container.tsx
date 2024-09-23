import { Asset } from "../../data/model/assets";
import { PageContext } from "../../data/model/project";
import AssetCard from "./asset-card";

export default function AssetCardsContainer({
    className, context
}: {
    className?: string, context: PageContext
}) {
    const { project, setProject, containerWidth } = context;
    const cols = Math.floor(containerWidth / 500);

    function updateCallback(id: string) {
        return (newAsset: Asset) => {
            project.assets.set(id, newAsset);
            setProject(project);
        };
    }

    return (
        <div
            className={`w-full h-full grid gap-2 ${className}`}
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
