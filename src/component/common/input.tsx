import { ChangeEventHandler } from "react";

export function Input({
    className, placeholder, defaultValue, onChange, readOnly
}: {
    className?: string,
    placeholder?: string,
    defaultValue?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    readOnly?: boolean
}) {
    return (
        <input
            className={`flex items-center focus:outline-none h-9 bg-semidarker border-2 px-2 py-1 rounded-md border-transparent
                ${readOnly ? "cursor-default" : "hover:border-outline focus:border-outline"}
                ${className}`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            readOnly={readOnly}
        />
    );
}
