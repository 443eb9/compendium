import { MouseEventHandler, ReactNode } from "react";
import Button from "./button";
import { t } from "i18next";

export default function LabelledButton({
    label, children, className, onClick
}: {
    label: string, children?: ReactNode, className?: string, onClick?: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <Button
            className={`flex gap-2 justify-center items-center py-1 px-4 ${className}`}
            onClick={onClick}
        >
            {children}
            {t(label)}
        </Button>
    );
}
