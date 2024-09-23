import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./common/button";
import clsx from "clsx";
import { t } from "i18next";

export default function SideBarButton({
    to, icon, name, isSelecting
}: {
    to: string, icon: string | ReactNode, name: string, isSelecting: boolean
}) {
    return (
        <Link to={to} className="flex w-full h-14 justify-center items-center">
            <Button className={clsx("flex flex-col w-full h-full justify-center items-center pt-1", { "bg-semidarker": isSelecting })} noOutline>
                <div className="text-2xl">
                    {typeof icon == "string" ? <img src={icon} alt="icon" /> : icon}
                </div>
                <div className="relative font-bold text-md">
                    <h3>{t(name)}</h3>
                    <div
                        className="absolute h-1 -bottom-2 rounded-full bg-accent transition-all"
                        style={{
                            width: isSelecting ? "100%" : "0"
                        }}
                    >
                    </div>
                </div>
            </Button>
        </Link>
    );
}
