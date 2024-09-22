import { Asset } from "../../data/model/assets";
import { PageContext } from "../../data/model/project";
import AssetCard from "./asset-card";

export default function AssetCardsContainer({
    className, assets, context
}: {
    className?: string, assets: Asset[], context: PageContext
}) {
    function updateCallback(index: number) {
        return (newAsset: Asset) => {
            let { project, setProject } = context;
            project.assets[index] = newAsset;
            setProject(project);
        };
    }

    return (
        <div className={className}>
            {
                assets
                    .map((asset, i) => {
                        return {
                            asset: asset,
                            index: i,
                        };
                    })
                    .reverse()
                    .map((packed) =>
                        <AssetCard
                            key={packed.index}
                            asset={packed.asset}
                            updateCallback={updateCallback(packed.index)}
                        />
                    )
            }
        </div>
    );
}
