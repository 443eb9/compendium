import { useState } from "react";

export function randomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7);
}

export function useRefresher() {
    const [refresh, setRefresh] = useState(false);
    function update() {
        setRefresh(!refresh);
    }
    return update;
}
