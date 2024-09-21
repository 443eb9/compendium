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
            },
        },
    },
});

export default i18n;
