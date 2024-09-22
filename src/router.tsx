import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import HomePage from "./page/home";
import ItemsPage from "./page/items";
import CharacterPage from "./page/character";
import StoryPage from "./page/story";
import StructurePage from "./page/structure";
import TerrainPage from "./page/terrain";
import AssetsPage from "./page/assets";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                path: "/",
                element: <HomePage />
            },
            {
                path: "/items",
                element: <ItemsPage />
            },
            {
                path: "/character",
                element: <CharacterPage />
            },
            {
                path: "/story",
                element: <StoryPage />
            },
            {
                path: "/structure",
                element: <StructurePage />
            },
            {
                path: "/terrain",
                element: <TerrainPage />
            },
            {
                path: "/assets",
                element: <AssetsPage />
            }
        ]
    }
]);
