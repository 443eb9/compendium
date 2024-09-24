import clsx from "clsx";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";

export default function Button({
    children, className, noOutline, onClick, style
}: {
    children?: ReactNode, className?: string, noOutline?: boolean, onClick?: MouseEventHandler<HTMLButtonElement>, style?: CSSProperties
}) {
    return (
        <button
            className={clsx(
                `hover:bg-semidarker border-outline transition-colors rounded-md ${className}`,
                { "border-2": !noOutline }
            )}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
}
