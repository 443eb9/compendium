import { ReactNode } from "react";
import { usePageContext } from "../../../data/model/project";

export default function ContainerTemplate({ children }: { children?: ReactNode }) {
    const { containerWidth } = usePageContext();
    const cols = Math.floor(containerWidth / 500);

    return (
        <div
            className="w-full h-full grid gap-2"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
            {children}
        </div>
    )
}
