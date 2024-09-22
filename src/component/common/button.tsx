import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";

export default function Button({
    children, className, noOutline, onClick
}: {
    children?: ReactNode, className?: string, noOutline?: boolean, onClick?: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <button
            className={clsx(
                `hover:bg-semidarker border-outline transition-colors rounded-md ${className}`,
                { "border-2": !noOutline }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
