import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en-US",
    resources: {
        "en-US": {
            translation: {
                // Common
                "Browse": "Browse",
                "Settings": "Settings",
                "CloseSettings": "Close Settings",
                "SettingsSaveSuccess": "Successfully saved settings!",
                "Save": "Save",
                "Generate": "Generate",

                // Enums
                "Uuid": "UUID",
                "IncreasingSequence": "Increasing Sequence",

                "Image": "Image",
                "Video": "Video",
                "Text": "Text",
                "Model": "Model",

                // Root
                "HomeButton": "Home",
                "ItemsButton": "Items",
                "StoryButton": "Story",
                "CharactersButton": "Characters",
                "StructuresButton": "Structures",
                "TerrainButton": "Terrain",
                "AssetsButton": "Assets",

                // Home
                "WelcomeText": "Hi, welcome to Compendium, a tool that empowers game developers to build their world with help of code easier and faster.",
                "OpenProject": "Open Project",
                "CreateProject": "Create Project",
                "CloseProject": "Close Project",
                "ProjectCreateSuccess": "Successfully created project!",
                "ProjectCloseSuccess": "Successfully closed project.",
                "ProjectCreateFailAlreadyExists": "Project creation failed: A project already exists in the folder.",
                "ProjectCreateFailRootFolder": "Project creation failed: Folder is root of a driver.",
                "ProjectFetchErrorProjectUninitialized": "Project fetch failed: Project not initialized.",
                "ProjectWritingErrorIoError": "Project writing failed: IO error.",
                "ProjectWritingErrorInterrupted": "Project writing failed: Operation was interrupted.",
                "ProjectOpenSuccess": "Successfully opened project.",
                "ProjectOpenErrorIoError": "Project open failed: IO error",
                "ProjectOpenErrorDeserializingError": "Project open failed: Invalid project file.",

                // Assets
                "AssetPreview": "Preview",
                "CreateAsset": "Create Asset",
                "AssetType": "Type",
                "AssetId": "Id",
                "AssetName": "Name",
                "AssetPath": "Path",
                "PreviewHint": "Currently, preview supports for image assets.",
                "IdTypeSection": "ID Type",
                "NextId": "Next ID",
            },
        },
    },
});

export default i18n;
