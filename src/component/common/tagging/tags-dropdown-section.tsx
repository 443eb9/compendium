import { t } from "i18next";
import { usePageContext } from "../../../data/model/project";
import Button from "../button";

export default function TagsDropdownSection({
    addTag, isExpanded, setExpanded
}: {
    addTag: (tagId: string) => void, isExpanded: boolean, setExpanded: (ex: boolean) => void
}) {
    const { project } = usePageContext();

    return (
        <div
            className={
                `absolute flex top-9 flex-col z-10 max-h-48 overflow-y-auto transition-all bg-darker border-2 border-outline
                ${isExpanded ? "scale-y-100" : "scale-y-0"}`
            }
            style={{
                transformOrigin: "top",
                borderTopRightRadius: "6px",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
            }}
        >
            {
                [...project.tags.values()].map((tag, i) =>
                    <Button
                        key={i}
                        className="flex flex-col mx-1 px-1"
                        onClick={() => {
                            addTag(tag.id);
                            setExpanded(false);
                        }}
                        noOutline
                    >
                        {i == 0 ? "" : <div className="w-full h-[2px] bg-outline"></div>}
                        <div key={i} className="flex items-center h-9 w-full" style={{ color: tag.color }}>
                            {tag.name == "" ? <div className="italic">{t("Unnamed")}</div> : tag.name}
                        </div>
                    </Button>
                )
            }
        </div>
    );
}
