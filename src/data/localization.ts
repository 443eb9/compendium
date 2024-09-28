import i18n, { TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import { Error } from "../data/model/common";

export function localizeError(err: Error, t: TFunction<"translation", undefined>) {
    return t(err.ty) + " " + err.content
}

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en-US",
    resources: {
        "en-US": {
            translation: {
                // Common
                "": "",
                "Browse": "Browse",
                "Settings": "Settings",
                "CloseSettings": "Close Settings",
                "SettingsSaveSuccess": "Successfully saved settings!",
                "Add": "Add",
                "Save": "Save",
                "Generate": "Generate",
                "Preview": "Preview",
                "Type": "Type",
                "Reference": "Reference",
                "Id": "Id",
                "Name": "Name",
                "Path": "Path",
                "Color": "Color",
                "Tags": "Tags",
                "Desc": "Description",
                "Unnamed": "Unnamed",
                "Search": "Search",
                "Close": "Close",
                "Title": "Title",
                "Body": "Body",
                "Regenerate": "Regenerate",
                "Cancel": "Cancel",
                "Continue": "Continue",

                "IdTypeSection": "ID Type",
                "NextId": "Next ID",
                "IdRegenerationWarn": "References might get corrupted after the regeneration. Do you REALLY want to continue?",
                "IdRegenerationSuccess": "Successfully regenerated IDs. Happy refactoring :p",

                "ProjectWritingError": "Project writing failed",

                // Enums
                "Uuid": "UUID",
                "IncreasingSequence": "Increasing Sequence",

                "Image": "Image",
                "Video": "Video",
                "Audio": "Audio",
                "Text": "Text",
                "Model": "Model",

                "Asset": "Asset",
                "Item": "Item",
                "Structure": "Structure",

                "SelectAsset": "Select Asset",
                "SelectItem": "Select Item",
                "SelectStructure": "Select Structure",

                // Root
                "HomeButton": "Home",
                "ItemsButton": "Items",
                "StoriesButton": "Stories",
                "CharactersButton": "Characters",
                "StructuresButton": "Structures",
                "TerrainButton": "Terrain",
                "AssetsButton": "Assets",
                "TreeButton": "Tree",

                "ProjectUpdateSuccess": "Successfully updated project!",
                "ProjectUpdateErrorProjectUninitialized": "Project update failed: Project uninitialized.",
                "ProjectUpdateErrorInvalidProject": "Project update failed: Invalid project.",

                // Home
                "WelcomeText": "Hi, welcome to Compendium, a tool that empowers game developers to build their world with help of code easier and faster.",
                "OpenProject": "Open Project",
                "CreateProject": "Create Project",
                "CloseProject": "Close Project",
                "ProjectCreateSuccess": "Successfully created project!",
                "ProjectCloseSuccess": "Successfully closed project.",
                "ProjectCloseErrorProjectUninitialized": "Project close failed: Project uninitialized.",
                "ProjectCreateFailAlreadyExists": "Project creation failed: A project already exists in the folder.",
                "ProjectCreateFailRootFolder": "Project creation failed: Folder is root of a driver.",
                "ProjectFetchErrorProjectUninitialized": "Project fetch failed: Project not initialized.",
                "ProjectWritingErrorIoError": "Project writing failed: IO error.",
                "ProjectWritingErrorInterrupted": "Project writing failed: Operation was interrupted.",
                "ProjectOpenSuccess": "Successfully opened project.",
                "ProjectOpenErrorIoError": "Project open failed: IO error",
                "ProjectOpenErrorDeserializingError": "Project open failed: Invalid project file.",

                // Assets
                "CreateAsset": "Create Asset",
                "PreviewNotSupport": "Currently, preview only supports for image assets.",
                "PreviewNotAvailable": "No asset is chosen. Preview is not available.",
                "UnrecognizedFileType": "Failed to recognize type of this file. Are you sure this is a valid asset?",
                "PathType": "Path Type",
                "Absolute": "Absolute",
                "Relative": "Relative",

                // Items
                "CreateItem": "Create Item",

                // Tags
                "CreateTag": "Create Tag",

                // Stories
                "CreateStory": "Create Story",
                "RefType": "Ref Type",
            },
        },
    },
});

export default i18n;
