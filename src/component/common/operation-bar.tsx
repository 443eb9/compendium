import { MouseEventHandler, ReactNode } from "react";
import LabelledButton from "./labelled-button";
import { useTranslation } from "react-i18next";

export type Operation = {
    label: string,
    icon: ReactNode,
    className: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

export default function OperationBar({ operations }: { operations: Operation[] }) {
    const { t } = useTranslation();

    return (
        <div className="sticky flex gap-2 h-12 py-1 top-0 backdrop-blur-md z-20 shadow-md">
            {
                operations.map((op) =>
                    <LabelledButton
                        label={t(op.label)}
                        className={op.className}
                        onClick={op.onClick}
                    >
                        {op.icon}
                    </LabelledButton>
                )}
        </div>
    );
}
