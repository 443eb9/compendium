import { AssetData, AssetType, identifyAssetType } from "../../data/model/assets";
import ListElement from "../common/list-element";
import { Input } from "../common/input";
import Button from "../common/button";
import { open } from "@tauri-apps/plugin-dialog"
import DropdownSection from "../common/dropdown-section";
import toast from "react-hot-toast";
import AssetPreview from "./preview/asset-preview";
import CardTemplate from "../common/templates/card-template";
import CardListTemplate from "../common/templates/card-list-template";
import { useState } from "react";
import { t } from "i18next";

export default function AssetCard({
    asset, updateCallback
}: {
    asset: AssetData, updateCallback: (asset: AssetData) => void
}) {
    const [curAsset, setCurAsset] = useState(asset);
    function updateCurAsset(asset: AssetData) {
        setCurAsset(asset);
        updateCallback(asset);
    }

    return (
        <CardTemplate>
            <AssetPreview asset={curAsset} />
            <CardListTemplate>
                <ListElement label={t("Type")}>
                    <DropdownSection
                        defaultValue={curAsset.ty}
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
                        onChange={(ty) => updateCurAsset({
                            ...curAsset,
                            ty: ty,
                        })}
                    />
                </ListElement>
                <ListElement label={t("Id")}>
                    <Input value={curAsset.id.toString()} onChange={(ev) => {
                        updateCurAsset({
                            ...curAsset,
                            id: ev.target.value ?? "",
                        });
                    }} readOnly />
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input value={curAsset.name} onChange={(ev) => {
                        updateCurAsset({
                            ...curAsset,
                            name: ev.currentTarget.value ?? "",
                        });
                    }} />
                </ListElement>
                <ListElement label={t("Path")}>
                    <Input value={curAsset.path} onChange={(ev) => {
                        updateCurAsset({
                            ...curAsset,
                            path: ev.currentTarget.value ?? "",
                        });
                    }} readOnly />
                    <Button
                        className="h-full px-3 ml-2"
                        onClick={async () => {
                            const file = await open({ title: "Select asset" });
                            if (file != null) {
                                const ty = identifyAssetType(file);
                                if (ty == undefined) {
                                    toast.error(t("UnrecognizedFileType"));
                                    updateCurAsset({
                                        ...curAsset,
                                        path: file,
                                    });
                                } else {
                                    updateCurAsset({
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
                </ListElement>
            </CardListTemplate>
        </CardTemplate>
    );
}
