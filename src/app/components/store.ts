import { atom } from "jotai";

export type speedtype = 1 | 2 | 3 | 4 | 5;

export const speedAtom = atom<speedtype>(1);

export const debrisstatusatom = atom<boolean>(true);
export const rocketbodystatusatom = atom<boolean>(false);
export const payloadstatusatom = atom<boolean>(false);

  
export interface SatelliteCesiumForm {
  lng: number,
  lat: number,      
  elevation: number,  
  azimuth: number,  
  range: number,   
  height:number,   
  velocity:number  
};

export const satelliteObjectAtom = atom<SatelliteCesiumForm[]>([]);
export const SpaceStationObjectAtom=atom<SatelliteCesiumForm[]>([]);
