"use client";

import { useAtomValue } from "jotai";
import { asteroidsAtom, currentObjectId, Neo } from "../store";
import { useState } from "react";

export default function InfoBar() {
  const data = useAtomValue(asteroidsAtom);
  const objectId = useAtomValue(currentObjectId);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  let selectedNeo: Neo | null = null;
  if (data && objectId) {
    for (const date in data.near_earth_objects) {
      const neos: Neo[] = data.near_earth_objects[date];
      const found = neos.find((neo) => neo.id === objectId);
      if (found) {
        selectedNeo = found;
        break;
      }
    }
  }

  return (
    <>
      {/* Closed state button (top-left) */}
      {!showSideBar && (
        <button
          onClick={() => setShowSideBar(true)}
          className="fixed top-4 left-4 z-50 w-12 h-12 bg-cyan-400 text-black font-bold rounded-full shadow-lg hover:bg-cyan-500 flex items-center justify-center transition-all duration-200"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      {objectId&&showSideBar && (
        <div className="fixed left-0 top-0 w-[300px] h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6 flex flex-col shadow-lg border-r border-gray-700 overflow-auto">
          {/* Close button inside top-right of sidebar */}
          <button
            onClick={() => setShowSideBar(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-cyan-400 text-black font-bold rounded-full shadow-lg hover:bg-cyan-500 flex items-center justify-center z-50 transition-all duration-200"
          >
            ×
          </button>

          <h2 className="font-extrabold text-xl mb-6 text-cyan-400 drop-shadow-lg">
            Asteroid Info
          </h2>

          {!selectedNeo ? (
            <p className="text-gray-400">No asteroid selected</p>
          ) : (
            <div className="space-y-4">
              <p>
                <span className="font-semibold text-cyan-300">Name:</span>{" "}
                {selectedNeo.name}
              </p>
              <p>
                <span className="font-semibold text-cyan-300">ID:</span>{" "}
                {selectedNeo.id}
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Diameter:</span>{" "}
                {(
                  (selectedNeo.estimated_diameter.kilometers
                    .estimated_diameter_min +
                    selectedNeo.estimated_diameter.kilometers
                      .estimated_diameter_max) /
                  2
                ).toFixed(3)}{" "}
                km
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Hazardous:</span>{" "}
                {selectedNeo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Magnitude:</span>{" "}
                {selectedNeo.absolute_magnitude_h}
              </p>

              <p className="font-semibold text-cyan-300 mt-2">
                Close Approaches:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                {selectedNeo.close_approach_data.map((entry, idx) => (
                  <li key={idx}>
                    <span className="text-white">
                      {entry.close_approach_date}
                    </span>{" "}
                    - Miss:{" "}
                    <span className="text-yellow-400">
                      {parseFloat(entry.miss_distance.kilometers).toFixed(2)} km
                    </span>{" "}
                    - Orbiting: {entry.orbiting_body}
                  </li>
                ))}
              </ul>

              <a
                className="mt-2 inline-block text-blue-400 hover:text-blue-300 underline font-medium"
                href={selectedNeo.nasa_jpl_url}
                target="_blank"
              >
                More Info
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
