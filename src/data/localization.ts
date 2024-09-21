import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en-US",
    resources: {
        "en-US": {
            translation: {
                // Root
                "homeButton": "Home",
                "itemsButton": "Items",
                "storyButton": "Story",
                "charactersButton": "Characters",
                "structuresButton": "Structures",
                "terrainButton": "Terrain",

                // Home
                "welcomeText": "Hi, welcome to Compendium, a tool that empowers game developers to build their world with help of code easier and faster.",
                "openProject": "Open Project",
                "createProject": "Create Project",
                "closeProject": "Close Project",
                "projectCreateSuccess": "Project creation succeeded!",
                "projectCloseSuccess": "Successfully closed project.",
                "projectCreateFailNotEmpty": "Project creation failed: Folder not empty.",
                "projectCreateFailRootFolder": "Project creation failed: Folder is root of a driver.",
                "projectCreateIoError": "Project creation failed: IO error.",
                "projectFetchErrorProjectUninitialized": "Project fetch failed: Project not initialized.",
                "projectWritingErrorIoError": "Project writing failed: IO error.",
                "projectWritingErrorInterrupted": "Project writing failed: Operation was interrupted.",
                "projectOpenSuccess": "Successfully opened project.",
                "projectOpenErrorIoError": "Project open failed: IO error",
                "projectOpenErrorDeserializingError": "Project open failed: Invalid project file.",
            },
        },
        "zh-Hans": {
            translation: {
                // Root
                "homeButton": "首页",
                "itemsButton": "物品",
                "storyButton": "设定",
                "charactersButton": "角色",
                "structuresButton": "结构",
                "terrainButton": "地形",

                // Home
                "welcomeText": "Hi, welcome to Compendium, a tool that empowers game developers to build their world with help of code easier and faster.",
                "openProject": "Open Project",
                "createProject": "Create Project",
                "projectCreateSuccess": "Project creation succeeded!",
                "projectCreateFailNotEmpty": "Project creation failed: Folder not empty.",
                "projectCreateFailRootFolder": "Project creation failed: Folder is root of a driver.",
                "projectCreateIoError": "Project creation failed: IO error.",
                "projectFetchErrorProjectUninitialized": "Project fetch failed: Project not initialized.",
                "projectWritingErrorIoError": "Project writing failed: Io Error.",
                "projectWritingErrorInterrupted": "Project writing failed: Operation was interrupted.",
            },
        },
    },
});

export default i18n;
