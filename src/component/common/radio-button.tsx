import { IoCheckmarkSharp } from "react-icons/io5";
import LabelledButton from "./labelled-button";
import { useTranslation } from "react-i18next";

export default function RadioButton({
    label, data, callback, className, isEnabled
}: {
    label: string, data: any, callback: (option: any) => void, className?: string, isEnabled: boolean
}) {
    const { t } = useTranslation();

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
