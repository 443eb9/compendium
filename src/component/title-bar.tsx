import { getCurrentWindow } from "@tauri-apps/api/window";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const buttonStyle = "flex justify-center items-center w-12 transition-colors";
const appWindow = getCurrentWindow();

export default function TitleBar() {
    return (
        <div
            className="flex w-full h-8 justify-between backdrop-blur-md shadow-md"
            data-tauri-drag-region
        >
            <div className="flex gap-2 items-center m-2">
                <img src="tauri.svg" alt="favicon" className="h-full" data-tauri-drag-region />
                <h1 data-tauri-drag-region>Compendium</h1>
            </div>
            <div className="flex">
                <button className={`${buttonStyle} hover:bg-darker`} onClick={() => appWindow.minimize()}><FiMinimize /></button>
                <button className={`${buttonStyle} hover:bg-darker`} onClick={() => appWindow.toggleMaximize()}><FiMaximize /></button>
                <button className={`${buttonStyle} hover:bg-red-500`} onClick={() => appWindow.close()}><IoClose /></button>
            </div>
        </div>
    );
}
