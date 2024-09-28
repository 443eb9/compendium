import { t } from "i18next";
import ListSectionTitle from "./list-section-title";
import RadioButtonGroup from "./radio-button-group";

export default function RadioButtonSection({
    title, labels, options, callback, enabled
}: {
    title: string, labels: any[], options: any[], callback: (option: any) => void, enabled: any
}) {
    return (
        <div>
            <ListSectionTitle title={t(title)} />
            <div className="flex">
                <RadioButtonGroup
                    labels={labels}
                    options={options}
                    callback={callback}
                    enabled={enabled}
                />
            </div>
        </div>
    );
}
