import { v4 } from "uuid";

export enum IdType {
    Uuid,
    IncreasingSequence,
}

export function generateId(ty: IdType, nextId: number): { id: string, next: number } {
    switch (ty) {
        case IdType.Uuid:
            return { id: v4(), next: nextId };
        case IdType.IncreasingSequence:
            return { id: nextId.toString(), next: nextId + 1 };
    }
}
