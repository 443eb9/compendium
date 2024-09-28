import { t } from "i18next";
import ListSectionTitle from "./list-section-title";
import RadioButtonGroup from "./radio-button-group";
import { ReactNode } from "react";

export default function RadioButtonSection({
    title, labels, options, callback, enabled, children
}: {
    title: string, labels: any[], options: any[], callback: (option: any) => void, enabled: any, children?: ReactNode
}) {
    return (
        <div className="flex flex-col gap-2">
            <ListSectionTitle title={t(title)} />
            <div className="flex">
                <RadioButtonGroup
                    labels={labels}
                    options={options}
                    callback={callback}
                    enabled={enabled}
                />
            </div>
            {children}
        </div>
    );
}
