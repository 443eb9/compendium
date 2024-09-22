import { IdType } from "./common"

export type Asset = {
    ty: AssetType,
    id: string,
    name: string,
    path: string,
}

export enum AssetType {
    Image,
    Video,
    Audio,
    Text,
    Model,
}

export type AssetSettingsData = {
    idType: IdType,
    nextId: number,
}

const imageExts = new Set(["jpg", "png", "bmp", "webp", "svg", "ase", "psd", "kra"]);
const videoExts = new Set(["mp4", "mkv"]);
const audioExts = new Set(["mp3", "wav", "ogg", "flac"]);
const textExts = new Set(["txt", "json", "toml", "yaml", "ron"]);
const modelExts = new Set(["obj", "fbx", "stl", "glb", "gltf", "blender"]);

export function identifyAssetType(path: string) {
    const split = path.split(".");
    const ext = split[split.length - 1];

    if (imageExts.has(ext)) { return AssetType.Image; }
    else if (videoExts.has(ext)) { return AssetType.Video; }
    else if (audioExts.has(ext)) { return AssetType.Audio; }
    else if (textExts.has(ext)) { return AssetType.Text; }
    else if (modelExts.has(ext)) { return AssetType.Model; }
}
