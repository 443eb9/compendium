import { MouseEventHandler, ReactNode } from "react";
import LabelledButton from "./labelled-button";

export type Operation = {
    label: string,
    icon: ReactNode,
    className: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

export default function OperationBar({ operations, visible }: { operations: Operation[], visible: boolean }) {
    return (
        <div
            className={`sticky ${visible ? "flex" : "hidden"} gap-2 h-12 py-1 top-0 backdrop-blur-md z-20 shadow-md`}
        >
            {
                operations.map((op, i) =>
                    <LabelledButton
                        key={i}
                        label={op.label}
                        className={op.className}
                        onClick={op.onClick}
                    >
                        {op.icon}
                    </LabelledButton>
                )}
        </div>
    );
}
