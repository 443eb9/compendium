import { createBrowserRouter } from "react-router-dom";
import Root from "./page/root";
import HomePage from "./page/home";
import ItemsPage from "./page/items";
import CharacterPage from "./page/character";
import StoryPage from "./page/story";
import StructurePage from "./page/structure";
import TerrainPage from "./page/terrain";
import AssetsPage from "./page/assets";
import TagsPage from "./page/tags";
import AssetCardsContainer from "./component/assets/asset-cards-container";
import AssetsSettings from "./component/assets/assets-settings";
import ItemCardsContainer from "./component/items/item-cards-container";
import ItemSettings from "./component/items/items-settings";
import TagsContainer from "./component/tags/tags-container";
import TagsSettings from "./component/tags/tags-settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/items",
                element: <ItemsPage />,
                children: [
                    {
                        path: "",
                        element: <ItemCardsContainer />,
                    },
                    {
                        path: "settings",
                        element: <ItemSettings />,
                    },
                ]
            },
            {
                path: "/character",
                element: <CharacterPage />,
            },
            {
                path: "/story",
                element: <StoryPage />,
            },
            {
                path: "/structure",
                element: <StructurePage />,
            },
            {
                path: "/terrain",
                element: <TerrainPage />,
            },
            {
                path: "/assets",
                element: <AssetsPage />,
                children: [
                    {
                        path: "",
                        element: <AssetCardsContainer />,
                    },
                    {
                        path: "settings",
                        element: <AssetsSettings />,
                    },
                ],
            },
            {
                path: "/tags",
                element: <TagsPage />,
                children: [
                    {
                        path: "",
                        element: <TagsContainer />,
                    },
                    {
                        path: "settings",
                        element: <TagsSettings />,
                    },
                ]
            },
        ],
    },
]);
