import { IdType } from "../../../data/model/common";
import RadioButtonSection from "../radio-button-section";

export default function IdSwitching({
    ty, setIdType
}: {
    ty: IdType, setIdType: (newTy: IdType) => void
}) {
    return (
        <RadioButtonSection
            title="IdTypeSection"
            labels={[IdType[IdType.Uuid], IdType[IdType.IncreasingSequence]]}
            options={[IdType.Uuid, IdType.IncreasingSequence]}
            callback={(op) => setIdType(op)}
            enabled={ty}
        />
    );
}
