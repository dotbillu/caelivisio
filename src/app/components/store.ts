import { atom } from "jotai";

export type speedtype = 1 | 2 | 3 | 4 | 5 

export const speedAtom =atom<speedtype>(1);

export const debrisstatusatom=atom<boolean>(true);
export const rocketbodystatusatom=atom<boolean>(false);
export const payloadstatusatom =atom<boolean>(false);
