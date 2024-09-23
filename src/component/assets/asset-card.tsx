import { useTranslation } from "react-i18next";
import { AssetData, AssetType, identifyAssetType } from "../../data/model/assets";
import ListElement from "../common/list-element";
import { Input } from "../common/input";
import Button from "../common/button";
import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog"
import DropdownSection from "../common/dropdown-section";
import toast from "react-hot-toast";
import AssetPreview from "./preview/asset-preview";
import CardTemplate from "../common/templates/card-template";
import CardListTemplate from "../common/templates/card-list-template";

export default function AssetCard({
    asset, updateCallback
}: {
    asset: AssetData, updateCallback: (asset: AssetData) => void
}) {
    const { t } = useTranslation();
    const [isEditing, setEditing] = useState(false);
    const [curAsset, setCurAsset] = useState(asset);

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
                        setEditing={setEditing}
                        onChange={(ty) => setCurAsset({
                            ...curAsset,
                            ty: ty,
                        })}
                    />
                </ListElement>
                <ListElement label={t("Id")}>
                    <Input defaultValue={curAsset.id} readOnly />
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input defaultValue={curAsset.name} onChange={(ev) => {
                        setEditing(true);
                        setCurAsset({
                            ...curAsset,
                            name: ev.currentTarget.value ?? ""
                        });
                    }} />
                </ListElement>
                <ListElement label={t("Path")}>
                    <Input defaultValue={curAsset.path} onChange={() => setEditing(true)} readOnly />
                    <Button
                        className="h-full px-3 ml-2"
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
            </CardListTemplate>
        </CardTemplate>
    );
}
