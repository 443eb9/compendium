import { convertFileSrc } from "@tauri-apps/api/core";
import { AssetData, AssetType } from "../../../data/model/assets";
import AssetImgPreview from "./asset-img-preview";
import { t } from "i18next";

export default function AssetPreview({ asset }: { asset: AssetData | undefined }) {
    function getPreview(asset: AssetData) {
        if (asset.path == "") {
            return <div className="italic">{t("PreviewNotAvailable")}</div>;
        }

        const path = convertFileSrc(asset.path);
        switch (asset.ty) {
            case AssetType.Image:
                return <AssetImgPreview src={path} />;
            default:
                return <div className="italic">{t("PreviewNotSupport")}</div>
        }
    }
    const preview = asset == undefined ? <div className=""></div> : getPreview(asset);

    return (
        <div className="w-full max-w-[360px]">
            <h2>{t("Preview")}</h2>
            {preview}
        </div>
    );
}
