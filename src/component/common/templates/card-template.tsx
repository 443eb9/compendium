import { ReactNode } from "react";

export default function CardTemplate({ children }: { children?: ReactNode }) {
    return (
        <div className="flex gap-4 m-2">
            {children}
        </div>
    );
}
