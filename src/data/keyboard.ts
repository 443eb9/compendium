const keyboardMapping = new Map<string, ((ev: KeyboardEvent) => void)[]>();

export function addKeyboardEvent(key: string, callback: (ev: KeyboardEvent) => void) {
    if (keyboardMapping.has(key)) {
        keyboardMapping.get(key)?.push(callback);
    } else {
        keyboardMapping.set(key, [callback]);
    }
}

export function removeKeyboardEvent(key: string) {
    keyboardMapping.delete(key);
}

export function initKeyboardEvent() {
    document.addEventListener("keydown", (ev) => {
        keyboardMapping.get(ev.key)?.forEach((callback) => callback(ev));
    });
}
