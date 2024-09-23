import { v4 } from "uuid";

export type Error = {
    ty: string,
    content: string,
}

export enum IdType {
    Uuid,
    IncreasingSequence,
}

export type Tag = {
    id: string,
    name: string,
    color: string,
}

export function generateId(ty: IdType, nextId: number): { id: string, next: number } {
    switch (ty) {
        case IdType.Uuid:
            return { id: v4(), next: nextId };
        case IdType.IncreasingSequence:
            return { id: nextId.toString(), next: nextId + 1 };
    }
}
