import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./common/button";

export default function SideBarButton({ to, icon, name, isSelecting }: { to: string, icon: string | ReactNode, name: string, isSelecting: boolean }) {
    return (
        <Link to={to} className="flex w-full h-14 justify-center items-center">
            <Button className="flex flex-col w-full h-full relative justify-center items-center">
                {typeof icon == "string" ? <img src={icon} alt="icon" /> : icon}
                <h2 className="font-bold text-md">{name}</h2>
                {
                    isSelecting && <div className="absolute h-1 -bottom-2 rounded-full bg-accent" style={{ width: "calc(100% - 30px)" }}></div>
                }
            </Button>
        </Link>
    );
}
