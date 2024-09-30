import { useNavigate } from "react-router-dom";
import PageTemplate from "../component/common/templates/page-template";
import { generateId, ReferenceType } from "../data/model/common";
import { usePageContext } from "../data/model/project";
import { IoAdd } from "react-icons/io5";

export default function StoriesPage() {
    const context = usePageContext();
    const { project, setProject } = context;

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createStory() {
        const { id, next } = generateId(
            project.storiesSettings.idType,
            project.storiesSettings.nextId,
        );

        console.log(project);
        console.log(id);

        setProject({
            ...project,
            stories: new Map([
                ...project.stories,
                [
                    id,
                    {
                        id: id,
                        reference: "",
                        refType: ReferenceType.Asset,
                        title: "",
                        body: "",
                    }
                ]
            ]),
            storiesSettings: {
                ...project.storiesSettings,
                nextId: next,
            },
        });
    }

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateStory",
                    icon: <IoAdd className="text-2xl" />,
                    className: "",
                    onClick: createStory,
                }
            ]}
        />
    );
}
