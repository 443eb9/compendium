import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./common/button";
import { useTranslation } from "react-i18next";

export default function SideBarButton({ to, icon, name, isSelecting }: { to: string, icon: string | ReactNode, name: string, isSelecting: boolean }) {
    const { t } = useTranslation();

    return (
        <Link to={to} className="flex w-full h-14 justify-center items-center">
            <Button className="flex flex-col w-full h-full justify-center items-center pt-1" noOutline>
                <div className="text-2xl">
                    {typeof icon == "string" ? <img src={icon} alt="icon" /> : icon}
                </div>
                <h2 className="relative font-bold text-md">{t(name)}
                    {
                        isSelecting && <div className="absolute w-full h-1 -bottom-2 rounded-full bg-accent"></div>
                    }
                </h2>
            </Button>
        </Link>
    );
}
