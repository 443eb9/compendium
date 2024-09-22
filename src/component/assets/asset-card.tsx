import { useTranslation } from "react-i18next";
import { Asset, AssetType } from "../../data/model/assets";
import ListElement from "../common/list-element";
import { Input } from "../common/input";
import Button from "../common/button";
import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog"
import DropDownSelection from "../common/drop-down-selection";
import AssetImgPreview from "./preview/asset-img-preview";
import { convertFileSrc } from "@tauri-apps/api/core";

export default function AssetCard({
    asset, updateCallback
}: {
    asset: Asset, updateCallback: (asset: Asset) => void
}) {
    const { t } = useTranslation();
    const [isEditing, setEditing] = useState(false);
    const [curAsset, setCurAsset] = useState(asset);

    function getPreview(asset: Asset) {
        if (asset.path == "") {
            return <div className=""></div>;
        }

        const path = convertFileSrc(asset.path);

        switch (asset.ty) {
            case AssetType.Image:
                return <AssetImgPreview src={path} />;
            default:
                return <div className="">{t("PreviewHint")}</div>
        }
    }
    const preview = getPreview(curAsset);

    return (
        <div className="flex gap-4 m-2">
            <div className="w-1/2">
                <h2>{t("AssetPreview")}</h2>
                {preview}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <ListElement labelClassName="w-48" label={t("AssetType")}>
                    <DropDownSelection
                        defaultValue={curAsset.ty}
                        className="w-full h-full"
                        labels={[
                            AssetType[AssetType.Image],
                            AssetType[AssetType.Video],
                            AssetType[AssetType.Model],
                            AssetType[AssetType.Text],
                        ]}
                        options={[
                            AssetType.Image,
                            AssetType.Video,
                            AssetType.Model,
                            AssetType.Text,
                        ]}
                        setEditing={setEditing}
                        onChange={(ty) => setCurAsset({
                            ...curAsset,
                            ty: ty,
                        })}
                    />
                </ListElement>
                <ListElement labelClassName="w-48" label={t("AssetId")}>
                    <Input className="w-full" defaultValue={curAsset.id} readOnly />
                </ListElement>
                <ListElement labelClassName="w-48" label={t("AssetName")}>
                    <Input className="w-full" defaultValue={curAsset.name} onChange={() => setEditing(true)} />
                </ListElement>
                <ListElement labelClassName="w-48" label={t("AssetPath")}>
                    <div className="flex gap-2 w-full">
                        <Input className="w-full" defaultValue={curAsset.path} onChange={() => setEditing(true)} readOnly />
                        <Button
                            className="px-3"
                            onClick={async () => {
                                const file = await open({ title: "Select asset" });
                                if (file != null) {
                                    setCurAsset({
                                        ...curAsset,
                                        path: file,
                                    });
                                    setEditing(true);
                                }
                            }}
                        >
                            {t("Browse")}
                        </Button>
                    </div>
                </ListElement>
                {
                    isEditing && <Button
                        className="py-1"
                        onClick={() => {
                            updateCallback(curAsset);
                            setEditing(false);
                        }}
                    >
                        {t("Save")}
                    </Button>
                }
            </div>
        </div>
    );
}
