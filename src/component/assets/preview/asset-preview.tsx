import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { AssetData, AssetType, PathType } from "../../../data/model/assets";
import AssetImgPreview from "./asset-img-preview";
import { t } from "i18next";
import { usePageContext } from "../../../data/model/project";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function AssetPreview({ asset }: { asset: AssetData | undefined }) {
    const { project } = usePageContext();
    const [element, setElement] = useState<JSX.Element | null>(null);

    async function getPreview(asset: AssetData | undefined) {
        if (!asset || asset.path == "") {
            return <div className="italic">{t("PreviewNotAvailable")}</div>;
        }

        async function convertPath() {
            switch (project.assetsSettings.pathType) {
                case PathType.Absolute:
                    // @ts-ignore
                    return asset.path;
                case PathType.Relative:
                    // @ts-ignore
                    return await invoke("absolutize_path", { path: asset.path, base: project.path })
                        .catch(err => toast.error(err)) as string;
            }
        }

        const path = convertFileSrc(await convertPath());
        switch (asset.ty) {
            case AssetType.Image:
                return <AssetImgPreview src={path} />;
            default:
                return <div className="italic">{t("PreviewNotSupport")}</div>
        }
    }

    useEffect(() => {
        const fn = async () => setElement(await getPreview(asset));
        fn();
    }, [asset]);

    return (
        <div className="w-full max-w-[360px]">
            <h2>{t("Preview")}</h2>
            {element}
        </div>
    );
}
