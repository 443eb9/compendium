import { Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";

export type Project = {
    path: string,
    name: string,
}

export function useProjectContext() {
    return useOutletContext<[Project | null, Dispatch<SetStateAction<Project | null>>]>();
}
