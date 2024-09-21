import { MouseEventHandler, ReactNode } from "react";

export default function Button({ children, className, onClick }: { children?: ReactNode, className?: string, onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button className={`hover:bg-hover-dark transition-colors rounded-md ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
