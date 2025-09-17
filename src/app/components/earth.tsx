"use client";
import axios from "axios";
import { Cartesian3, Color, Ion } from "cesium";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Entity } from "resium";
import SatelliteData from "../libs/satellites";
import { useAtom } from "jotai";
import {
  AllObjectAtom,
  debrisstatusatom,
  payloadstatusatom,
  spacestationstatusatom,
} from "./store";
const Viewer = dynamic(() => import("resium").then((mod) => mod.Viewer), {
  ssr: false,
});
export default function Earth() {
  const cesiumtoken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN;
  const [allObjects, setAllObjects] = useAtom(AllObjectAtom);
  const [spaceStationStatus] = useAtom(spacestationstatusatom);
  const [payloadStatus] = useAtom(payloadstatusatom);
  const [debrisStatus] = useAtom(debrisstatusatom);
  useEffect(() => {
    Ion.defaultAccessToken = cesiumtoken!;

    async function getSatelliteTLE() {
      const SatelliteURL =
        "https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&FORMAT=tle";
      const res1 = await axios.get(SatelliteURL, { responseType: "text" });
      const Satellites = SatelliteData(res1.data, "satelliteType");

      const SpaceStationURL =
        "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle";
      const res2 = await axios.get(SpaceStationURL, { responseType: "text" });
      const spaceStations = SatelliteData(res2.data, "spaceStationType");

      const debrisURL =
        "https://celestrak.org/NORAD/elements/gp.php?GROUP=cosmos-2251-debris&FORMAT=tle";
      const res3 = await axios.get(debrisURL, { responseType: "text" });
      const debris = SatelliteData(res3.data, "debrisType");

      setAllObjects([...Satellites, ...spaceStations, ...debris]);
    }

    getSatelliteTLE();
  }, [cesiumtoken,AllObjectAtom,setAllObjects]);
  return (
    <div>
      <Viewer full>
        {payloadStatus &&
          satelliteData.map((sat, idx) => (
            <Entity
              key={idx}
              name={sat.name}
              position={Cartesian3.fromDegrees(sat.lng, sat.lat, sat.height)}
              point={{ pixelSize: 9, color: Color.YELLOW }}
            />
          ))}
      </Viewer>
    </div>
  );
}
