import { getSatelliteInfo } from "tle.js"; // Removed 'TLE' import
import { SatelliteCesiumForm, thing } from "../components/store";

interface TleWithName {
  name: string;
  tle: [string, string];
}

export default function processSatellites(rawTLE: string,thing:thing): SatelliteCesiumForm[] {
  const observerLat = 37.709203;
  const observerLng = -97.427754;

  const lines = rawTLE
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const tleList: TleWithName[] = [];

  for (let i = 0; i < lines.length; i += 3) {
    const name = lines[i];
    const line1 = lines[i + 1];
    const line2 = lines[i + 2];
    if (line1 && line2) {
      tleList.push({ name, tle: [line1, line2] });
    }
  }

  const satellitesData: SatelliteCesiumForm[] = tleList.map((tleObj) => {
    const info = getSatelliteInfo(tleObj.tle, null!, observerLat, observerLng, 0);
    return {
      Type:thing,
      name: tleObj.name,
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

