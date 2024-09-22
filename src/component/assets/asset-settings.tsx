import ListSectionTitle from "../common/list-section-title";
import { useTranslation } from "react-i18next";
import RadioButtonGroup from "../common/radio-button-group";
import { AssetSettingsData } from "../../data/model/assets";
import { IdType } from "../../data/model/common";

export default function AssetSettings({
    settings, setSettings
}: {
    settings: AssetSettingsData, setSettings: (settings: AssetSettingsData) => void
}) {
    const { t } = useTranslation();

    return (
        <div className="">
            <ListSectionTitle title={t("IdTypeSection")} />
            <div className="flex">
                <RadioButtonGroup
                    labels={[IdType[IdType.Uuid], IdType[IdType.IncreasingSequence]]}
                    options={[IdType.Uuid, IdType.IncreasingSequence]}
                    callback={(op) => setSettings({
                        ...settings,
                        idType: op
                    })}
                    enabled={settings.idType}
                ></RadioButtonGroup>
            </div>
        </div>
    );
}
