import { ChangeEventHandler, CSSProperties, ReactNode } from "react";

export default function TextArea({
    className, onChange, readOnly, value, children, style
}: {
    className?: string
    onChange?: ChangeEventHandler<HTMLTextAreaElement>,
    readOnly?: boolean,
    value?: string,
    children?: ReactNode,
    style: CSSProperties
}) {
    return (
        <textarea
            className={`flex flex-grow items-center focus:outline-none h-9 bg-semidarker border-2 px-2 py-1 rounded-md border-transparent
            ${readOnly ? "cursor-default" : "hover:border-outline focus:border-outline"}
            ${className}`}
            onChange={onChange}
            value={value}
            style={style}
        >
            {children}
        </textarea>
    );
}
