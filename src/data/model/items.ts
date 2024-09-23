import { IdType, Tag } from "./common"

export type Item = {
    id: string,
    reference: string,
    name: string,
    tags: Set<Tag>,
}

export type ItemsSettingsData = {
    idType: IdType,
    nextId: number,
}
