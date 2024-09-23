import { AssetSettingsData } from "../../data/model/assets";
import IdSwitching from "../common/settings/id-switching";

export default function AssetsSettings({
    settings, setSettings
}: {
    settings: AssetSettingsData, setSettings: (settings: AssetSettingsData) => void
}) {
    return (
        <div>
            <IdSwitching ty={settings.idType} setIdType={(ty) => setSettings({
                ...settings,
                idType: ty
            })} />
        </div>
    );
}
