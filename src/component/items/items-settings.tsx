import { ItemsSettingsData } from "../../data/model/items";
import IdSwitching from "../common/settings/id-switching";

export default function ItemSettings({
    settings, setSettings
}: {
    settings: ItemsSettingsData, setSettings: (settings: ItemsSettingsData) => void
}) {
    return (
        <div className="">
            <IdSwitching ty={settings.idType} setIdType={(ty) => setSettings({
                ...settings,
                idType: ty,
            })} />
        </div>
    )
}
