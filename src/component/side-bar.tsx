import { GrBook, GrCubes, GrHome } from "react-icons/gr";
import SideBarButton from "./side-bar-button";
import { RiRobot2Line } from "react-icons/ri";
import { IoCubeOutline, IoEarthOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export default function SideBar({ projectLoaded }: { projectLoaded: boolean }) {
    const pages = [
        {
            to: "/",
            icon: <GrHome />,
            name: "homeButton"
        },
        {
            to: "/items",
            icon: <GrCubes />,
            name: "itemsButton"
        },
        {
            to: "/story",
            icon: <GrBook />,
            name: "storyButton"
        },
        {
            to: "/character",
            icon: <RiRobot2Line />,
            name: "charactersButton"
        },
        {
            to: "/structure",
            icon: <IoCubeOutline />,
            name: "structuresButton"
        },
        {
            to: "/terrain",
            icon: <IoEarthOutline />,
            name: "terrainButton"
        }
    ];

    const location = useLocation();

    return (
        <div className="flex flex-col min-w-24 gap-6 h-full">
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
