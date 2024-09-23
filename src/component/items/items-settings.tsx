import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";

export default function ItemSettings() {
    const { project, setProject } = usePageContext();

    return (
        <div className="">
            <IdSwitching ty={project.itemsSettings.idType} setIdType={(ty) => {
                setProject({
                    ...project,
                    itemsSettings: {
                        ...project.itemsSettings,
                        idType: ty,
                    }
                })
            }} />
        </div>
    )
}
