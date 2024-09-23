import { ReactNode } from "react";

export default function ListElement({
    label, children, className, labelClassName
}: {
    label: string, children?: ReactNode, className?: string, labelClassName?: string
}) {
    return (
        <div className={`flex h-9 justify-between items-center ${className}`}>
            <h6 className={`w-24 ${labelClassName}`}>{label}</h6>
            {children}
        </div>
    );
}
