import { IdType, TagData } from "./common"

export type ItemData = {
    id: string,
    reference: string,
    name: string,
    tags: Set<TagData>,
}

export type ItemsSettingsData = {
    idType: IdType,
    nextId: number,
}
