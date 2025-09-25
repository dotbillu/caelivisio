import { atom } from "jotai";

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
