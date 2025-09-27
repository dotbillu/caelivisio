"use client";

import { useAtom, useAtomValue } from "jotai";
import { asteroidsAtom, currentObjectId, PlotAtom, orbitTargetAtom, Neo, EphemerisEntry } from "../store";
import { useState } from "react";
import * as THREE from "three";

export default function RightSideBar() {
  const data = useAtomValue(asteroidsAtom);
  const plotData = useAtomValue(PlotAtom);
  const [currentId, setCurrentObjectId] = useAtom(currentObjectId);
  const [, setOrbitObject] = useAtom(orbitTargetAtom);

  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [filterHazardous, setFilterHazardous] = useState<"ALL" | "YES" | "NO">("ALL");
  let allNeos: Neo[] = [];
  if (data) {
    for (const date in data.near_earth_objects) {
      allNeos.push(...data.near_earth_objects[date]);
    }
  }
  const filteredNeos = allNeos.filter((neo) => {
    if (filterHazardous === "ALL") return true;
    if (filterHazardous === "YES") return neo.is_potentially_hazardous_asteroid;
    return !neo.is_potentially_hazardous_asteroid;
  });
  const handleClick = (neo: Neo) => {
    setCurrentObjectId(neo.id);
    const ephemeris = plotData[neo.id];
    if (ephemeris) {
      const sortedEntries = Object.entries(ephemeris).sort(
        ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
      );
      if (sortedEntries.length > 0) {
        const lastEntry = sortedEntries[sortedEntries.length - 1][1];
        const scaledPos = lastEntry.pos.map((v, i) => (i === 0 ? v / 1e6 + 149 : v / 1e6));
        setOrbitObject(new THREE.Vector3(...scaledPos));
      }
    }
  };

  return (
    <>
      {!showSideBar && (
        <button
          onClick={() => setShowSideBar(true)}
          className="fixed top-4 right-4 z-50 w-12 h-12 bg-purple-500 text-black font-bold rounded-full shadow-lg hover:bg-purple-600 flex items-center justify-center transition-all duration-200"
        >
          ☰
        </button>
      )}
      {showSideBar && (
        <div className="fixed right-0 top-0 w-[300px] h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6 flex flex-col shadow-lg border-l border-gray-700 overflow-auto">
          
          {/* Close button */}
          <button
            onClick={() => setShowSideBar(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-purple-500 text-black font-bold rounded-full shadow-lg hover:bg-purple-600 flex items-center justify-center z-50 transition-all duration-200"
          >
            ×
          </button>

          <h2 className="font-extrabold text-xl mb-4 text-purple-400 drop-shadow-lg">Asteroid List</h2>

          {/* Filter buttons */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setFilterHazardous("ALL")}
              className={`px-3 py-1 rounded ${
                filterHazardous === "ALL" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterHazardous("YES")}
              className={`px-3 py-1 rounded ${
                filterHazardous === "YES" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              Hazardous
            </button>
            <button
              onClick={() => setFilterHazardous("NO")}
              className={`px-3 py-1 rounded ${
                filterHazardous === "NO" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              Non-Hazardous
            </button>
          </div>

          {/* Asteroid list */}
          <ul className="flex-1 overflow-auto space-y-2">
            {filteredNeos.map((neo) => {
              const isSelected = neo.id === currentId;
              return (
                <li
                  key={neo.id}
                  onClick={() => handleClick(neo)}
                  className={`px-2 py-1 rounded cursor-pointer transition-colors flex justify-between items-center ${
                    isSelected ? "bg-purple-600 text-white" : "bg-gray-800 hover:bg-purple-700"
                  }`}
                >
                  <span>{neo.name}</span>
                  
                </li>
              );
            })}
            {filteredNeos.length === 0 && <li className="text-gray-400">No asteroids found.</li>}
          </ul>
        </div>
      )}
    </>
  );
}

