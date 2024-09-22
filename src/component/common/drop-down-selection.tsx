import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./button";

export default function DropDownSelection({
    className, options, labels, defaultValue, setEditing, onChange
}: {
    className?: string,
    options: any[],
    labels: string[],
    defaultValue: any,
    setEditing?: Dispatch<SetStateAction<boolean>>,
    onChange?: (value: any) => void
}) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(defaultValue);
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <div
                className={
                    `flex items-center h-9 px-1 focus:outline-none border-2
                     ${expanded
                        ? "bg-darker border-outline border-b-transparent"
                        : "bg-semidarker border-transparent hover:border-outline"}`
                }
                onClick={() => setExpanded(!expanded)}
                style={{
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                    borderBottomLeftRadius: expanded ? "0" : "6px",
                    borderBottomRightRadius: expanded ? "0" : "6px",
                }}
            >
                {t(labels[selected])}
            </div>
            <div
                className={
                    `absolute flex-col z-10 overflow-hidden w-full transition-all bg-darker border-x-2 border-b-2 border-outline
                    ${expanded ? "flex" : "hidden"}`
                }
                style={{
                    borderBottomLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                }}
            >
                {
                    options.map((_, i) =>
                        <Button
                            key={i}
                            className="flex flex-col px-1"
                            onClick={() => {
                                setSelected(i);
                                setExpanded(false);
                                if (setEditing != null) {
                                    setEditing(true);
                                }
                                if (onChange != null) {
                                    onChange(options[i]);
                                }
                            }}
                            noOutline
                        >
                            <div className="w-full h-[2px] bg-outline"></div>
                            <div key={i} className="flex items-center h-9 w-full">
                                {labels[i]}
                            </div>
                        </Button>
                    )
                }
            </div>
        </div>
    );
}
