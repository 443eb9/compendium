import { GrCubes, GrHome } from "react-icons/gr";
import SideBarButton from "./side-bar-button";

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
            icon: <GrCubes />,
            name: "Story"
        },
        {
            to: "/character",
            icon: <GrCubes />,
            name: "Character"
        },
        {
            to: "/structure",
            icon: <GrCubes />,
            name: "Structure"
        },
        {
            to: "/terrain",
            icon: <GrCubes />,
            name: "Terrain"
        }
    ];

    return (
        <div className="flex flex-col w-20 px-5 gap-4 h-full">
            {
                pages.map((page, i) => <SideBarButton key={i} to={page.to} icon={page.icon} name={page.name} isSelecting />)
            }
        </div>
    );
}
