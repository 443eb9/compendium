import { useState } from "react";
import Button from "../button";
import Tag from "./tag";
import { t } from "i18next";
import TagsDropdownSection from "./tags-dropdown-section";
import clsx from "clsx";

export default function TagsDisplay({
    tags, setTags, readonly
}: {
    tags: Set<string>, setTags: (tags: Set<string>) => void, readonly?: boolean
}) {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <div className="flex flex-grow gap-2 flex-wrap w-24">
            {
                [...tags.values()].map((tag, i) =>
                    <Tag key={i} tag={tag} />
                )
            }
            {
                !readonly &&
                <div className="relative">
                    <Button
                        className={clsx(`h-9 px-3 border-2 border-outline`,
                            { "bg-darker border-b-transparent": isExpanded }
                        )}
                        onClick={() => setExpanded(!isExpanded)}
                        style={{
                            borderTopLeftRadius: "6px",
                            borderTopRightRadius: "6px",
                            borderBottomLeftRadius: isExpanded ? "0" : "6px",
                            borderBottomRightRadius: isExpanded ? "0" : "6px",
                        }}
                    >{t("Add")}</Button>
                    <TagsDropdownSection
                        isExpanded={isExpanded}
                        setExpanded={setExpanded}
                        addTag={(id) => {
                            tags.add(id);
                            setTags(tags);
                        }}
                    />
                </div>
            }
        </div>
    );
}
