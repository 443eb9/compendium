import { Id, IdType } from "./common"

export type TagData = {
    id: Id,
    name: string,
    desc: string,
    color: string,
}

export type TagsSettingsData = {
    idType: IdType,
    nextId: number,
}
