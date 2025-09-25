import { atom } from "jotai";
import * as THREE from 'three';

export type zoomObject = "EARTH" | "SUN" | "ASTEROID";
export const ZoomObjectAtom = atom<zoomObject>("EARTH");
type Range<
  Start extends number,
  End extends number,
  Acc extends number[] = [],
> = Acc["length"] extends End
  ? Acc[number]
  : Range<Start, End, [Acc["length"], ...Acc]>;

export type ZoomValue = Range<2, 900>;
export const ZoomValueAtom = atom<ZoomValue>(3);





export const orbitTargetAtom = atom(new THREE.Vector3(0, 0, 0)); 
