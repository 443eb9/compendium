import { useState } from "react";
import Button from "../button";
import Tag from "./tag";
import { t } from "i18next";
import TagsDropdownSection from "./tags-dropdown-section";
import clsx from "clsx";
import { useRefresher } from "../../../data/util";

export default function TagsDisplay({
    tags, readonly
}: {
    tags: Set<string>, readonly?: boolean
}) {
    const [isExpanded, setExpanded] = useState(false);
    const update = useRefresher();

    return (
        <div className="flex flex-grow gap-2 flex-wrap w-24">
            {
                [...tags.values()].map((tag, i) =>
                    <button key={i} onClick={() => {
                        tags.delete(tag);
                        update();
                    }}>
                        <Tag tag={tag} />
                    </button>
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
                    >
                        {t("Add")}
                    </Button>
                    <TagsDropdownSection
                        isExpanded={isExpanded}
                        setExpanded={setExpanded}
                        addTag={id => tags.add(id)}
                    />
                </div>
            }
        </div>
    );
}
