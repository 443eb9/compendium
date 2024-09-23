import { useState } from "react";
import PageTemplate from "../component/common/page-template";
import { usePageContext } from "../data/model/project";
import ItemCardsContainer from "../component/items/item-cards-container";
import ItemSettings from "../component/items/items-settings";
import { IoAdd } from "react-icons/io5";
import { generateId } from "../data/model/common";
import { useNavigate } from "react-router-dom";

export default function ItemsPage() {
    const [settingsMode, setSettingsMode] = useState(false);
    const context = usePageContext();
    const { project, setProject, containerWidth } = context;

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createItem() {
        const { id, next } = generateId(
            project.assetsSettings.idType,
            project.assetsSettings.nextId,
        );

        setProject({
            ...project,
            items: new Map([
                ...project.items,
                [
                    id,
                    {
                        id: id,
                        reference: "",
                        name: "",
                        tags: new Set(),
                    }
                ]
            ]),
            itemsSettings: {
                ...project.assetsSettings,
                nextId: next,
            }
        });
    }

    return (
        <PageTemplate
            settingsMode={settingsMode}
            setSettingsMode={setSettingsMode}
            page={
                <ItemCardsContainer context={context} />
            }
            settings={
                <ItemSettings
                    settings={project.itemsSettings}
                    setSettings={(s) => setProject({ ...project, itemsSettings: s })}
                />
            }
            extraOperations={[
                {
                    label: "CreateItem",
                    icon: <IoAdd className="text-2xl" />,
                    className: settingsMode ? "hidden" : "",
                    onClick: createItem,
                }
            ]}
        />
    );
}
