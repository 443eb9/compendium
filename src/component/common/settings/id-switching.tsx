import { IoRefresh, IoWarningOutline } from "react-icons/io5";
import { IdType } from "../../../data/model/common";
import LabelledButton from "../labelled-button";
import RadioButtonSection from "../radio-button-section";
import { t } from "i18next";
import { useState } from "react";
import toast from "react-hot-toast";

export default function IdSwitching({
    ty, setIdType, regenerate
}: {
    ty: IdType, setIdType: (ty: IdType) => void, regenerate: (ty: IdType) => void
}) {
    const [toConfirm, setToConfirm] = useState(false);

    return (
        <RadioButtonSection
            title="IdTypeSection"
            labels={[IdType[IdType.Uuid], IdType[IdType.IncreasingSequence]]}
            options={[IdType.Uuid, IdType.IncreasingSequence]}
            callback={(op) => setIdType(op)}
            enabled={ty}
        >
            <div className="flex">
                <LabelledButton label="Regenerate" onClick={() => setToConfirm(true)} >
                    <IoRefresh className="text-lg" />
                </LabelledButton>
                <div
                    className={`absolute flex gap-2 p-1 w-96 bg-darker border-2 border-outline rounded-md transition-all
                        ${toConfirm ? "scale-y-100" : "scale-y-0"}`}
                    style={{
                        transformOrigin: "top",
                    }}
                >
                    <div className="flex items-center">
                        <IoWarningOutline className="text-5xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1>{t("IdRegenerationWarn")}</h1>
                        <div className="flex gap-2">
                            <LabelledButton label="Cancel" onClick={() => setToConfirm(false)} />
                            <LabelledButton label="Continue" className="text-warn" onClick={() => {
                                setToConfirm(false);
                                regenerate(ty);
                                toast.success(t("IdRegenerationSuccess"));
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </RadioButtonSection>
    );
}
