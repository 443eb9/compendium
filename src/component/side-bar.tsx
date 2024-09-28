import { GrBook, GrCubes, GrHome } from "react-icons/gr";
import SideBarButton from "./side-bar-button";
import { RiRobot2Line } from "react-icons/ri";
import { IoCubeOutline, IoEarthOutline, IoPricetagOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { MdWallpaper } from "react-icons/md";
import { PiTreeStructure } from "react-icons/pi";

export default function SideBar({ projectLoaded }: { projectLoaded: boolean }) {
    const pages = [
        {
            to: "/home",
            icon: <GrHome />,
            name: "HomeButton"
        },
        {
            to: "/assets",
            icon: <MdWallpaper />,
            name: "AssetsButton"
        },
        {
            to: "/tags",
            icon: <IoPricetagOutline />,
            name: "Tags",
        },
        {
            to: "/items",
            icon: <GrCubes />,
            name: "ItemsButton"
        },
        {
            to: "/stories",
            icon: <GrBook />,
            name: "StoriesButton"
        },
        {
            to: "/character",
            icon: <RiRobot2Line />,
            name: "CharactersButton"
        },
        {
            to: "/structure",
            icon: <IoCubeOutline />,
            name: "StructuresButton"
        },
        {
            to: "/terrain",
            icon: <IoEarthOutline />,
            name: "TerrainButton"
        },
        {
            to: "/tree",
            icon: <PiTreeStructure />,
            name: "TreeButton",
        },
    ];

    const location = useLocation();

    return (
        <div className="flex flex-col min-w-28 pr-2 gap-6 h-full overflow-y-auto pb-2">
            {
                pages.filter((_, i) => projectLoaded || i == 0).map((page, i) =>
                    <SideBarButton
                        key={i} to={page.to}
                        icon={page.icon}
                        name={page.name}
                        isSelecting={location.pathname.search(page.to) != -1}
                    />
                )
            }
        </div>
    );
}
