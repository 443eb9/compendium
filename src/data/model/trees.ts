import { Id, IdType } from "./common"

export type TreeData = {
    id: Id,
    name: string,
    nodes: TreeNode[],
    edges: NodeEdge[],
    viewOffset: [number, number],
}

export type NodeEdge = {
    from: Id,
    to: Id,
    // TODO condition
}

export type TreeNode = {
    id: Id,
    position: [number, number],
    size: [number, number],
    title: string,
    desc: string,
}

export type TreeSettingsData = {
    treeIdType: IdType,
    treeNextId: number,
    nodeIdType: IdType,
    nodeNextId: Map<Id, number>,
}
