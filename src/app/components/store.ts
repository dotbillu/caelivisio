import { atom } from "jotai";

export type speedtype = 1 | 2 | 3 | 4 | 5;

export const speedAtom = atom<speedtype>(1);

export const debrisstatusatom = atom<boolean>(false);

export const payloadstatusatom = atom<boolean>(false);
export const spacestationstatusatom = atom<boolean>(false);
  
export type thing = "satelliteType" | "spaceStationType" | "debrisType";  
export interface SatelliteCesiumForm {
  Type:thing;
  name:string,
  lng: number,
  lat: number,      
  elevation: number,  
  azimuth: number,  
  range: number,   
  height:number,   
  velocity:number  
};

export const AllObjectAtom = atom<SatelliteCesiumForm[]>([]);


