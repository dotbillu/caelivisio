import { getSatelliteInfo, TLE } from "tle.js";
import { SatelliteCesiumForm } from "../components/store";

export default function processSatellites(rawTLE: string) {
  const observerLat = 37.709203;
  const observerLng = -97.427754;

  const lines = rawTLE.split("\n").map(line => line.trim()).filter(Boolean);
  const tleList: TLE[] = [];

  for (let i = 0; i < lines.length; i += 3) {
    const name = lines[i];
    const line1 = lines[i + 1];
    const line2 = lines[i + 2];
    if (line1 && line2) {
      tleList.push({ name, tle: [line1, line2] });
    }
  }

 const satellitesData: SatelliteCesiumForm[] = tleList.map(tle => {
    const info = getSatelliteInfo(tle, null!, observerLat, observerLng, 0);
    return {
      lng: info.lng,
      lat: info.lat,
      elevation: info.elevation,
      azimuth: info.azimuth,
      range: info.range,
      height: info.height,
      velocity: info.velocity,
    };
  });

  return satellitesData;
}

