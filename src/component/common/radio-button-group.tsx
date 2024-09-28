import RadioButton from "./radio-button";

export default function RadioButtonGroup({
    callback, enabled, options, labels
}: {
    callback: (option: any) => void, enabled: any, options: any[], labels: string[]
}) {
    if (options.length != labels.length) {
        throw new Error("Length of `options` and `labels` should be equivalent");
    }

    return (
        <div className="flex flex-wrap gap-2">
            {
                options.map((option, i) =>
                    <RadioButton
                        key={i}
                        data={option}
                        label={labels[i]}
                        callback={callback}
                        isEnabled={enabled == option}
                    />
                )
            }
        </div>
    );
}
