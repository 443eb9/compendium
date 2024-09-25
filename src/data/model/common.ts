import { v4 } from "uuid";
import { AssetData } from "./assets";
import { ItemData } from "./items";

export type Error = {
    ty: string,
    content: string,
}

export type Id = string;
export type Referenceable = AssetData | ItemData;

export enum IdType {
    Uuid,
    IncreasingSequence,
}

export function generateId(ty: IdType, nextId: number): { id: Id, next: number } {
    switch (ty) {
        case IdType.Uuid:
            return { id: v4(), next: nextId };
        case IdType.IncreasingSequence:
            return { id: nextId.toString(), next: nextId + 1 };
    }
}
