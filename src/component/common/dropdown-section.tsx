import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./button";

export default function DropdownSection({
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
    const [isExpanded, setExpanded] = useState(false);

    // TODO disgusting redundant `useEffect`
    useEffect(() => {
        if (selected != defaultValue) {
            setSelected(defaultValue);
        }
    });

    return (
        <div className={`relative ${className}`}>
            <div
                className={
                    `flex flex-grow items-center h-9 px-2 focus:outline-none border-2
                     ${isExpanded
                        ? "bg-darker border-outline border-b-transparent"
                        : "bg-semidarker border-transparent hover:border-outline"}`
                }
                onClick={() => setExpanded(!isExpanded)}
                style={{
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                    borderBottomLeftRadius: isExpanded ? "0" : "6px",
                    borderBottomRightRadius: isExpanded ? "0" : "6px",
                }}
            >
                {t(labels[(() => { console.log(selected); return selected })()])}
            </div>
            <div
                className={
                    `absolute flex top-9 flex-col z-10 overflow-hidden w-full transition-all bg-darker border-x-2 border-b-2 border-outline
                    ${isExpanded ? "scale-y-100" : "scale-y-0"}`
                }
                style={{
                    transformOrigin: "top",
                    borderBottomLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                }}
            >
                {
                    options.map((_, i) =>
                        <Button
                            key={i}
                            className="flex flex-col mx-1 px-1"
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
