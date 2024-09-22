import ProjectSave from "../component/project-save";
import { usePageContext } from "../data/model/project";

export default function ItemsPage() {
    const { project, setProject } = usePageContext();
    console.log(project)

    return (
        <div className="">
            <ProjectSave />
        </div>
    );
}
