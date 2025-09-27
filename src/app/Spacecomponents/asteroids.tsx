// components/Asteroids.tsx
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { asteroidsAtom, PlotAtom, EphemerisEntry, EphermisWid } from "../store";
import axios from "axios";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export default function Asteroids() {
  const [asteroids, setAsteroids] = useAtom(asteroidsAtom);
  const [plotData, setPlotData] = useAtom(PlotAtom);

  const [asteroidIds, setAsteroidIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchAsteroidList = async () => {
      try {
        const res = await fetch("/assets/AsteroidData.json");
        const data = await res.json();
        setAsteroids(data);
        const allIds = Object.values(data.near_earth_objects).flatMap(
          (neos: any) => neos.map((neo: any) => neo.id),
        );
        setAsteroidIds(allIds);
      } catch (err) {
        console.error("Failed to load AsteroidData.json:", err);
      }
    };
    fetchAsteroidList();
  }, [setAsteroids]);

  useEffect(() => {
    if (asteroidIds.length === 0) return;

    const getObjectPlots = async () => {
      console.log(`Fetching plots for ${asteroidIds.length} asteroids...`);
      for (const id of asteroidIds) {
        try {
          const resp = await axios.get(`/api/horizons?id=${id}`);
          const ephemerisForId = resp.data?.[id];

          if (ephemerisForId) {
            setPlotData((currentData) => ({
              ...currentData,
              [id]: ephemerisForId,
            }));
          }
        } catch (error) {
          console.error(`Failed to fetch plot for asteroid ID ${id}:`, error);
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      console.log("Finished fetching all asteroid plots.");
    };

    getObjectPlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asteroidIds]);

  const [AsteroidTexture] = useLoader(THREE.TextureLoader, [
    "/assets/asteroid.jpg",
  ]);

  return (
    <>
      {Object.entries(plotData).map(([asteroidId, ephemeris]) => {
        const ephemerisData = ephemeris as { [date: string]: EphemerisEntry };

        const sortedEntries = Object.entries(ephemerisData).sort(
          ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime(),
        );

        if (sortedEntries.length < 2) {
          return null;
        }

        const points = sortedEntries.map(([, entry]) => {
          const scaledPos = entry.pos.map((v, i) =>
            i === 0 ? v / 1e6 + 149 : v / 1e6,
          );
          return new THREE.Vector3(...scaledPos);
        });

        const curve = new THREE.CatmullRomCurve3(points);

        const lastPosition = points[points.length - 1];

        return (
          <group key={asteroidId}>
            <mesh>
              <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
              <meshBasicMaterial color="gray" />
            </mesh>

            <mesh
              position={lastPosition}
              onClick={() => alert(`${asteroidId}`)}
            >
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial map={AsteroidTexture} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
