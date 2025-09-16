"use client";
import axios from "axios";
import { Cartesian3, Color, Ion } from "cesium";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Entity } from "resium";
import SatelliteData from "../libs/satellites";
import { useAtom } from "jotai";
import { satelliteObjectAtom, SpaceStationObjectAtom } from "./store";
const Viewer = dynamic(() => import("resium").then((mod) => mod.Viewer), {
  ssr: false,
});
export default function Earth() {
  const cesiumtoken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN;
  const [satelliteData, setSateliteData] = useAtom(satelliteObjectAtom);
  const [spaceStation, setSpaceStation] = useAtom(SpaceStationObjectAtom);

  useEffect(() => {
    Ion.defaultAccessToken = cesiumtoken!;

    async function getSatelliteTLE() {
      const SatelliteURL =
        "https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&FORMAT=tle";
      let res = await axios.get(SatelliteURL, { responseType: "text" });
      const Satellites = SatelliteData(res.data);
      setSateliteData(Satellites);
      const SpaceStationURL =
        "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle";
      res = await axios.get(SpaceStationURL, { responseType: "text" });
      const spaceStations = SatelliteData(res.data);
      setSpaceStation(spaceStations);
    }

    getSatelliteTLE();
  }, [cesiumtoken, setSateliteData, setSpaceStation]);

  return (
    <div>
      <Viewer full>
        {satelliteData.map((sat, idx) => (
          <Entity
            key={idx}
            name={`Satellite ${idx}`}
            position={Cartesian3.fromDegrees(sat.lng, sat.lat, sat.height)}
            point={{ pixelSize: 5, color: Color.YELLOW }}
          />
        ))}
        {spaceStation.map((sat, idx) => (
          <Entity
            key={idx}
            name={`Satellite ${idx}`}
            position={Cartesian3.fromDegrees(sat.lng, sat.lat, sat.height)}
            point={{ pixelSize: 10, color: Color.GREEN }}
          ></Entity>
        ))}
      </Viewer>
    </div>
  );
}
