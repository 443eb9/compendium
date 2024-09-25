import { t } from "i18next";
import { Id, Referenceable } from "../../../data/model/common";
import Button from "../button";
import { Input } from "../input";
import { useState } from "react";

export function BrowsingPanel({
    options, opened, setter, close
}: {
    options: Map<Id, Referenceable>,
    opened: boolean,
    setter: (op: Id) => void,
    close: () => void
}) {
    const [search, setSearch] = useState("");

    return (
        <div
            className={`absolute flex flex-col gap-2 max-w-96 max-h-48 overflow-x-auto p-1
                bg-darker border-2 border-outline rounded-md transition-transform 
                ${opened ? "scale-y-100" : "scale-y-0"}`}
            style={{
                transformOrigin: "top",
            }}
        >
            <div className="">{t("SelectAsset")}</div>
            <div className="flex gap-2 items-center">
                <Input onChange={(ev) => setSearch(ev.target.value ?? "")} />
            </div>
            <div className="flex flex-wrap gap-2">
                {
                    [...options.entries()]
                        .filter(([_, val]) => val.name.search(search) != -1)
                        .map(([key, val], i) =>
                            <Button key={i} className="px-3 py-1" onClick={() => {
                                setter(key);
                                close();
                            }}>
                                {val.name == "" ? <div className="italic">{t("Unnamed")}</div> : val.name}
                            </Button>
                        )
                }
            </div>
        </div>
    );
}
