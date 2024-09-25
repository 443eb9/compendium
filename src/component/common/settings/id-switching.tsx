import { t } from "i18next";
import { IdType } from "../../../data/model/common";
import ListSectionTitle from "../list-section-title";
import RadioButtonGroup from "../radio-button-group";

export default function IdSwitching({
    ty, setIdType
}: {
    ty: IdType, setIdType: (newTy: IdType) => void
}) {
    return (
        <div>
            <ListSectionTitle title={t("IdTypeSection")} />
            <div className="flex">
                <RadioButtonGroup
                    labels={[IdType[IdType.Uuid], IdType[IdType.IncreasingSequence]]}
                    options={[IdType.Uuid, IdType.IncreasingSequence]}
                    callback={(op) => setIdType(op)}
                    enabled={ty}
                ></RadioButtonGroup>
            </div>
        </div>
    );
}
