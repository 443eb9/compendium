import { t } from "i18next";
import { Id } from "../../../data/model/common";
import { usePageContext } from "../../../data/model/project";

export default function Tag({ tag }: { tag: Id }) {
    const { project } = usePageContext();
    const data = project.tags.get(tag);
    if (data == null) {
        return <div></div>;
    }

    return (
        <div
            className="flex justify-center items-center h-9 px-3 border-2 border-outline rounded-md"
            style={{
                backgroundColor: data.color,
            }}
        >
            {data.name == "" ? <div className="italic">{t("Unnamed")}</div> : data.name}
        </div>
    );
}
