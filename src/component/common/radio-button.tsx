import { IoCheckmarkSharp } from "react-icons/io5";
import LabelledButton from "./labelled-button";
import { t } from "i18next";

export default function RadioButton({
    label, data, callback, className, isEnabled
}: {
    label: string, data: any, callback: (option: any) => void, className?: string, isEnabled: boolean
}) {
    return (
        <LabelledButton label={t(label)} className={className} onClick={() => callback(data)}>
            {
                isEnabled
                    ? <IoCheckmarkSharp />
                    : <div className=""></div>
            }
        </LabelledButton>
    );
}
