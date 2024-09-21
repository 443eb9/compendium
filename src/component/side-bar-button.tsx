import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./common/button";
import { useTranslation } from "react-i18next";

export default function SideBarButton({ to, icon, name, isSelecting }: { to: string, icon: string | ReactNode, name: string, isSelecting: boolean }) {
    const { t } = useTranslation();

    return (
        <Link to={to} className="flex w-full h-14 justify-center items-center">
            <Button className="flex flex-col w-full h-full relative justify-center items-center">
                <div className="text-2xl">
                    {typeof icon == "string" ? <img src={icon} alt="icon" /> : icon}
                </div>
                <h2 className="font-bold text-md">{t(name)}</h2>
                {
                    isSelecting && <div className="absolute h-1 -bottom-2 rounded-full bg-accent" style={{ width: "calc(100% - 30px)" }}></div>
                }
            </Button>
        </Link>
    );
}
