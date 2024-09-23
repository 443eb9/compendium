import { usePageContext } from "../../data/model/project";
import IdSwitching from "../common/settings/id-switching";

export default function AssetsSettings() {
    const { project, setProject } = usePageContext();

    return (
        <div>
            <IdSwitching ty={project.assetsSettings.idType} setIdType={(ty) => {
                setProject({
                    ...project,
                    assetsSettings: {
                        ...project.assetsSettings,
                        idType: ty,
                    },
                })
            }} />
        </div>
    );
}
