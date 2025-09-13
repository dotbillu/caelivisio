import { atom } from "jotai";

export type speedtype = 1 | 2 | 3 | 4 | 5 

export const speedAtom =atom<speedtype>(1);

