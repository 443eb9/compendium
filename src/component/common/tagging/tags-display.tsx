import { useTranslation } from "react-i18next";
import { TagData } from "../../../data/model/common";
import Button from "../button";
import Tag from "./tag";

export default function TagsDisplay({
    tags, setTags
}: {
    tags: Set<TagData>, setTags: (tags: TagData[]) => void
}) {
    const { t } = useTranslation();

    return (
        <div className="">
            <div className="">
                {
                    [...tags.values()].map((tag, i) =>
                        <Tag key={i} tag={tag} />
                    )
                }
            </div>
            <Button className="h-9 px-3">{t("Add")}</Button>
        </div>
    );
}
