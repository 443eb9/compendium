import { ChangeEventHandler, CSSProperties, MouseEventHandler } from "react";

export function Input({
    className, placeholder, value, onChange, onClick, readOnly, style
}: {
    className?: string,
    placeholder?: string,
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClick?: MouseEventHandler<HTMLInputElement>,
    readOnly?: boolean,
    style?: CSSProperties
}) {
    return (
        <input
            className={`flex flex-grow items-center focus:outline-none h-9 bg-semidarker border-2 px-2 py-1 rounded-md border-transparent
                ${readOnly ? "cursor-default" : "hover:border-outline focus:border-outline"}
                ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            onClick={onClick}
            style={style}
        />
    );
}
