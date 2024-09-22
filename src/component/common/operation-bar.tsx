import { ReactNode } from "react";

export default function OperationBar({ children }: { children?: ReactNode }) {
    return (
        <div className="sticky flex gap-2 h-12 py-1 top-0 backdrop-blur-md z-20 shadow-md">
            {children}
        </div>
    );
}
