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
    Text,
    Model,
}

export type AssetSettingsData = {
    idType: IdType,
    nextId: number,
}
