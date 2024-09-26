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
import { t } from "i18next";
import { Id } from "../../data/model/common";
import { usePageContext } from "../../data/model/project";
import { useRefresher } from "../../data/util";

export default function AssetCard({ id }: { id: Id }) {
    const { project } = usePageContext();
    const asset = project.assets.get(id) as AssetData;
    const update = useRefresher();

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
                        onChange={ty => {
                            asset.ty = ty;
                            update();
                        }}
                    />
                </ListElement>
                <ListElement label={t("Id")}>
                    <Input value={asset.id.toString()} onChange={ev => {
                        asset.id = ev.target.value;
                        update();
                    }} readOnly />
                </ListElement>
                <ListElement label={t("Name")}>
                    <Input value={asset.name} onChange={ev => {
                        asset.name = ev.target.value;
                        update();
                    }} />
                </ListElement>
                <ListElement label={t("Path")}>
                    <Input value={asset.path} onChange={(ev) => {
                        asset.path = ev.target.value;
                        update();
                    }} readOnly />
                    <Button
                        className="h-full px-3 ml-2"
                        onClick={async () => {
                            const file = await open({ title: "Select asset" });
                            if (file != null) {
                                const ty = identifyAssetType(file);
                                asset.path = file;

                                if (ty == undefined) {
                                    toast.error(t("UnrecognizedFileType"));
                                } else {
                                    asset.ty = ty;
                                }

                                update();
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
