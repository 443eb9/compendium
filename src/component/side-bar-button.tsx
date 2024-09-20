import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function SideBarButton({ to, icon, name, isSelecting }: { to: string, icon: string | ReactNode, name: string, isSelecting: boolean }) {
    return (
        <Link to={to} className="flex flex-col items-center">
            {typeof icon == "string" ? <img src={icon} alt="icon" /> : icon}
            <h2 className="font-bold text-md">{name}</h2>
            {
                isSelecting && <div className="w-full h-1 rounded-full bg-accent"></div>
            }
        </Link>
    );
}
