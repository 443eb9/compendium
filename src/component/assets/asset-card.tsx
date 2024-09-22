import { useTranslation } from "react-i18next";
import { Asset, AssetType, identifyAssetType } from "../../data/model/assets";
import ListElement from "../common/list-element";
import { Input } from "../common/input";
import Button from "../common/button";
import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog"
import DropdownSection from "../common/dropdown-section";
import AssetImgPreview from "./preview/asset-img-preview";
import { convertFileSrc } from "@tauri-apps/api/core";
import toast from "react-hot-toast";

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
    const preview = getPreview(curAsset);

    return (
        <div className="flex gap-4 m-2">
            <div className="w-full max-w-[360px]">
                <h2>{t("AssetPreview")}</h2>
                {preview}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <ListElement labelClassName="w-24" label={t("AssetType")}>
                    <DropdownSection
                        defaultValue={curAsset.ty}
                        className="flex flex-grow"
                        labels={[
                            AssetType[AssetType.Image],
                            AssetType[AssetType.Video],
                            AssetType[AssetType.Audio],
                            AssetType[AssetType.Text],
                            AssetType[AssetType.Model],
                        ]}
                        options={[
                            AssetType.Image,
                            AssetType.Video,
                            AssetType.Audio,
                            AssetType.Text,
                            AssetType.Model,
                        ]}
                        setEditing={setEditing}
                        onChange={(ty) => setCurAsset({
                            ...curAsset,
                            ty: ty,
                        })}
                    />
                </ListElement>
                <ListElement labelClassName="w-24" label={t("AssetId")}>
                    <Input className="flex flex-grow" defaultValue={curAsset.id} readOnly />
                </ListElement>
                <ListElement labelClassName="w-24" label={t("AssetName")}>
                    <Input className="flex flex-grow" defaultValue={curAsset.name} onChange={(ev) => {
                        setEditing(true);
                        setCurAsset({
                            ...curAsset,
                            name: ev.currentTarget.value ?? ""
                        });
                    }} />
                </ListElement>
                <ListElement labelClassName="w-24" label={t("AssetPath")}>
                    <div className="flex gap-2">
                        <Input className="flex flex-grow" defaultValue={curAsset.path} onChange={() => setEditing(true)} readOnly />
                        <Button
                            className="px-3"
                            onClick={async () => {
                                const file = await open({ title: "Select asset" });
                                if (file != null) {
                                    setEditing(true);
                                    const ty = identifyAssetType(file);
                                    if (ty == undefined) {
                                        toast.error(t("UnrecognizedFileType"));
                                        setCurAsset({
                                            ...curAsset,
                                            path: file,
                                        });
                                    } else {
                                        setCurAsset({
                                            ...curAsset,
                                            path: file,
                                            ty: ty,
                                        });
                                    }
                                }
                            }}
                        >
                            {t("Browse")}
                        </Button>
                    </div>
                </ListElement>
                <Button
                    className={`py-1 ${isEditing ? "opacity-100" : "opacity-0"}`}
                    onClick={() => {
                        updateCallback(curAsset);
                        setEditing(false);
                    }}
                >
                    {t("Save")}
                </Button>
            </div>
        </div>
    );
}
