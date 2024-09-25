import { HexColorPicker } from "react-colorful";
import { Input } from "../input";
import { useState } from "react";
import Button from "../button";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function ColorPicker({
    opened, setter, close, defaultValue
}: {
    opened: boolean,
    setter: (col: string) => void,
    close: () => void,
    defaultValue: string
}) {
    const [curVal, setCurVal] = useState(defaultValue);

    return (
        <div className={`absolute flex flex-col gap-2 z-20 border-2 p-2 border-outline bg-darker rounded-md 
                        ${opened ? "" : "hidden"}`}>
            <HexColorPicker
                className="flex"
                color={defaultValue}
                onChange={newColor => setCurVal(newColor)}
            />
            <div className="flex gap-2">
                <Input className="w-2" value={curVal} readOnly style={{ backgroundColor: curVal }} />
                <Button
                    className="w-9 h-9 flex items-center justify-center"
                    onClick={() => {
                        setter(curVal);
                        close();
                    }}
                >
                    <IoCheckmarkSharp className="text-2xl" />
                </Button>
            </div>
        </div>
    );
}
