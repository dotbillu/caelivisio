// components/Asteroids.tsx
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { asteroidsAtom, AllPlotsData, PlotAtom } from "../store";
import axios from "axios";
import * as THREE from "three";

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
      try {
        const plotPromises = asteroidIds.map((id) =>
          axios
            .get(`/api/horizons?id=${id}`)
            .then((resp) => ({ id, data: resp.data })),
        );

        const results = await Promise.all(plotPromises);

        const newPlotData: AllPlotsData = {};
        results.forEach((result) => {
          if (result.data) {
            newPlotData[result.id] = result.data;
          }
        });

        setPlotData(newPlotData);
        // console.log("All plot data fetched and set:", newPlotData);
      } catch (err) {
        console.error("Failed to fetch one or more plots:", err);
      }
    };

    getObjectPlots();
  }, [asteroidIds, setPlotData]);

  return (
    <>
      {Object.entries(plotData).map(([asteroidId, ephemeris]) => (
        <group key={asteroidId}>
          {Object.entries(ephemeris).map((e) => {
            console.log(e);
            return (
              <mesh
                key={`${asteroidId}-`}
                position={
                  e.pos.map((v) => v / 1e7) as [number, number, number]
                }
              >
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="red" />
              </mesh>
            );
          })}
        </group>
      ))}
    </>
  );
}
