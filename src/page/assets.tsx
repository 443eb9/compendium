import { IoAdd } from "react-icons/io5";
import { AssetType } from "../data/model/assets";
import { usePageContext } from "../data/model/project";
import { useNavigate } from "react-router-dom";
import { generateId } from "../data/model/common";
import PageTemplate from "../component/common/templates/page-template";
import { useRefresher } from "../data/util";

export default function AssetsPage() {
    const context = usePageContext();
    const { project } = context;
    const update = useRefresher();

    if (project == null) {
        useNavigate()("/");
        return;
    }

    function createAsset() {
        const { id, next } = generateId(
            project.assetsSettings.idType,
            project.assetsSettings.nextId,
        );

        project.assets.set(id, {
            id: id,
            ty: AssetType.Image,
            name: "",
            path: "",
        });
        project.assetsSettings.nextId = next;
        update();
    }

    return (
        <PageTemplate
            extraOperations={[
                {
                    label: "CreateAsset",
                    icon: <IoAdd className="text-2xl" />,
                    className: "",
                    onClick: createAsset,
                }
            ]}
        />
    );
}
