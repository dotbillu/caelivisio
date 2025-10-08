// hooks/useAsteroids.ts
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { asteroidsAtom, PlotAtom, Neo, NeoFeed, EphermisWid } from "@/app/store";

export const useAsteroids = () => {
  const [asteroids, setAsteroids] = useAtom<NeoFeed | null>(asteroidsAtom);
  const [plotData, setPlotData] = useAtom<EphermisWid>(PlotAtom);
  const [asteroidIds, setAsteroidIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchAsteroidList = async () => {
      try {
        const res = await fetch("/assets/AsteroidData.json");
        const data: NeoFeed = await res.json(); 
        setAsteroids(data);

        const allIds = Object.values(data.near_earth_objects).flatMap(
          (neos: Neo[]) => neos.map((neo) => neo.id)
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
          const resp = await axios.get<EphermisWid>(`/api/horizons?id=${id}`);
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

  console.log(asteroids);
  return { asteroids, plotData };
};

