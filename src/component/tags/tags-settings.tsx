import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";

export default function TagsSettings() {
    const { project, setProject } = usePageContext();

    return (
        <div className="">
            <IdSwitching ty={project.tagsSettings.idType} setIdType={(ty) => {
                setProject({
                    ...project,
                    tagsSettings: {
                        ...project.tagsSettings,
                        idType: ty,
                    }
                })
            }}></IdSwitching>
        </div>
    );
}
