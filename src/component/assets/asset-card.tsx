import { useTranslation } from "react-i18next";
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

export default function AssetCard({
    asset, updateCallback
}: {
    asset: AssetData, updateCallback: (asset: AssetData) => void
}) {
    const { t } = useTranslation();

    return (
        <CardTemplate>
            <AssetPreview asset={asset} />
            <CardListTemplate>
                <ListElement label={t("Type")}>
                    <DropdownSection
                        defaultValue={asset.ty}
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
                        onChange={(ty) => updateCallback({
                            ...asset,
                            ty: ty,
                        })}
                    />
                </ListElement>
                <ListElement label={t("Id")}>
                    <Input defaultValue={asset.id.toString()} onChange={(ev) => {
                        updateCallback({
                            ...asset,
                            id: ev.target.value ?? "",
                        })
                    }} readOnly />
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input defaultValue={asset.name} onChange={(ev) => {
                        updateCallback({
                            ...asset,
                            name: ev.currentTarget.value ?? "",
                        });
                    }} />
                </ListElement>
                <ListElement label={t("Path")}>
                    <Input defaultValue={asset.path} onChange={(ev) => {
                        updateCallback({
                            ...asset,
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
                                    updateCallback({
                                        ...asset,
                                        path: file,
                                    });
                                } else {
                                    updateCallback({
                                        ...asset,
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
