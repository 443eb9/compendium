import { Id, IdType, ReferenceType } from "./common";

export type StoryData = {
    id: Id,
    reference: Id,
    refType: ReferenceType,
    title: string,
    body: string,
}

export type StorySettingsData = {
    idType: IdType,
    nextId: number,
}
