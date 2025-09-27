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

//nasa objects


export interface Neo {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
    orbiting_body: string;
  }[];
}

export interface NeoFeed {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: Record<string, Neo[]>; 
}

export const asteroidsAtom = atom<NeoFeed | null>(null);

export interface EphemerisEntry {
  pos: [number, number, number]; // X, Y, Z in km
  vel: [number, number, number]; // VX, VY, VZ in km/s
}

export interface EphemerisData {
  [date: string]: EphemerisEntry;
}
export interface EphermisWid{
  [id:string]:EphemerisData 
}
export const PlotAtom=atom<EphermisWid>({});
