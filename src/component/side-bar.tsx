import { GrBook, GrCubes, GrHome } from "react-icons/gr";
import SideBarButton from "./side-bar-button";
import { RiRobot2Line } from "react-icons/ri";
import { IoCubeOutline, IoEarthOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { MdWallpaper } from "react-icons/md";

export default function SideBar({ projectLoaded }: { projectLoaded: boolean }) {
    const pages = [
        {
            to: "/",
            icon: <GrHome />,
            name: "HomeButton"
        },
        {
            to: "/assets",
            icon: <MdWallpaper />,
            name: "AssetsButton"
        },
        {
            to: "/items",
            icon: <GrCubes />,
            name: "ItemsButton"
        },
        {
            to: "/story",
            icon: <GrBook />,
            name: "StoryButton"
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
    ];

    const location = useLocation();

    return (
        <div className="flex flex-col w-24 gap-6 h-full">
            {
                pages.filter((_, i) => projectLoaded || i == 0).map((page, i) =>
                    <SideBarButton
                        key={i} to={page.to}
                        icon={page.icon}
                        name={page.name}
                        isSelecting={location.pathname == page.to}
                    />
                )
            }
        </div>
    );
}
