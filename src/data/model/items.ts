import { Id, IdType } from "./common"

export type ItemData = {
    id: Id,
    reference: Id,
    name: string,
    desc: string,
    tags: Set<string>,
}

export type ItemsSettingsData = {
    idType: IdType,
    nextId: number,
}
