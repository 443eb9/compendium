import { GrBook, GrCubes, GrHome } from "react-icons/gr";
import SideBarButton from "./side-bar-button";
import { RiRobot2Line } from "react-icons/ri";
import { IoCubeOutline, IoEarthOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export default function SideBar() {
    const pages = [
        {
            to: "/",
            icon: <GrHome />,
            name: "Home"
        },
        {
            to: "/items",
            icon: <GrCubes />,
            name: "Items"
        },
        {
            to: "/story",
            icon: <GrBook />,
            name: "Story"
        },
        {
            to: "/character",
            icon: <RiRobot2Line />,
            name: "Character"
        },
        {
            to: "/structure",
            icon: <IoCubeOutline />,
            name: "Structure"
        },
        {
            to: "/terrain",
            icon: <IoEarthOutline />,
            name: "Terrain"
        }
    ];

    const location = useLocation();
    return (
        <div className="flex flex-col min-w-24 gap-6 h-full">
            {
                pages.map((page, i) => <SideBarButton key={i} to={page.to} icon={page.icon} name={page.name} isSelecting={location.pathname == page.to} />)
            }
        </div>
    );
}
