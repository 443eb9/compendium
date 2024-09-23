import { ReactNode } from "react";

export default function CardListTemplate({ children }: { children?: ReactNode }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {children}
        </div>
    );
}
