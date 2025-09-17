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
  SatelliteCesiumForm,
  spacestationstatusatom,
} from "./store";
import DistanceBetween from "../libs/DistanceHelper";
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
    function RankedObjects() {
      for (let i = 0; i < allObjects.length; i++) {
        const satt1 = allObjects[i];
        if (satt1.collision == "Low") {
          for (let j = i + 1; j < allObjects.length; ++j) {
            const satt2 = allObjects[j];
            const d = DistanceBetween(
              satt1.lat,
              satt1.lng,
              satt1.height,
              satt2.lat,
              satt2.lng,
              satt2.height,
            );
            if (d < 20) {
              satt1.collision = "High";
              satt2.collision = "High";
            }
          }
        }
      }
    }
    async function getSatelliteTLE() {
      const SatelliteURL = "/assets/satellites.txt";

      const res1 = await axios.get(SatelliteURL, { responseType: "text" });
      const Satellites = SatelliteData(res1.data, "satelliteType");

      const SpaceStationURL = "/assets/spaceStations.txt";
      const res2 = await axios.get(SpaceStationURL, { responseType: "text" });
      const spaceStations = SatelliteData(res2.data, "spaceStationType");

      const debrisURL = "/assets/debris.txt";
      const res3 = await axios.get(debrisURL, { responseType: "text" });
      const debris = SatelliteData(res3.data, "debrisType");

      setAllObjects([...Satellites, ...spaceStations, ...debris]);
      RankedObjects();
    }

    getSatelliteTLE();
  }, [cesiumtoken, allObjects, setAllObjects]);

  function HandlePoints(sat: SatelliteCesiumForm) {
    if (sat.Type === "debrisType") return { pixelSize: 5, color: Color.RED };
    if (sat.Type === "satelliteType")
      return { pixelSize: 10, color: Color.YELLOW };
    if (sat.Type === "spaceStationType")
      return { pixelSize: 20, color: Color.GREEN };
  }

  return (
    <div>
      <Viewer full>
        {allObjects.map((sat, idx) => {
          if (sat.Type === "debrisType" && !debrisStatus) return null;
          if (sat.Type === "satelliteType" && !payloadStatus) return null;
          if (sat.Type === "spaceStationType" && !spaceStationStatus)
            return null;

          return (
            <Entity
              key={idx}
              name={sat.name}
              position={Cartesian3.fromDegrees(sat.lng, sat.lat, sat.height)}
              point={HandlePoints(sat)}
              description={`Orbiting at ${sat.height} altitude <br/> 
  collision probability <span style="color:${sat.collision === "Low" ? "green" : "red"}">
    ${sat.collision}
  </span>`}
            />
          );
        })}
      </Viewer>
    </div>
  );
}
