"use client";

import { useAtomValue, useAtom } from "jotai";
import { asteroidsAtom, currentObjectId, Neo, showInfoBarAtom } from "../store";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function InfoBar() {
  const data = useAtomValue(asteroidsAtom);
  const objectId = useAtomValue(currentObjectId);
  const [showSideBar, setShowSideBar] = useAtom(showInfoBarAtom);
  const [orbitalData, setOrbitalData] = useState<any | null>(null);
  const [loadingOrbital, setLoadingOrbital] = useState(false);
  const [showJargon, setShowJargon] = useState(false);

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

  useEffect(() => {
    const fetchOrbitalData = async () => {
      if (selectedNeo?.links.self) {
        try {
          setLoadingOrbital(true);
          setOrbitalData(null);
          const res = await fetch(selectedNeo.links.self);
          if (!res.ok) throw new Error("Failed to fetch orbital data");
          const json = await res.json();
          setOrbitalData(json.orbital_data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingOrbital(false);
        }
      }
    };
    fetchOrbitalData();
  }, [selectedNeo?.links.self]);

  const jargonList = orbitalData
    ? [
        { key: "eccentricity", label: "Eccentricity", desc: "How elongated the orbit is", wiki: "https://en.wikipedia.org/wiki/Eccentricity_(orbit)" },
        { key: "semi_major_axis", label: "Semi-Major Axis", desc: "Half of the longest diameter of the orbit", wiki: "https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes_of_ellipses" },
        { key: "inclination", label: "Inclination", desc: "Tilt of the orbit relative to reference plane", wiki: "https://en.wikipedia.org/wiki/Orbital_inclination" },
        { key: "orbital_period", label: "Orbital Period", desc: "Time it takes to complete one orbit", wiki: "https://en.wikipedia.org/wiki/Orbital_period" },
      ]
    : [];

  return (
    <>
      {!showSideBar && (
        <button
          onClick={() => setShowSideBar(true)}
          className="fixed top-4 left-4 z-50 w-12 h-12 bg-cyan-400 text-black font-bold rounded-full shadow-lg hover:bg-cyan-500 flex items-center justify-center transition-all duration-200 text-lg"
        >
          ☰
        </button>
      )}

      {showSideBar && (
        <div
          className="fixed left-0 top-0 w-[40%] h-screen bg-black/90 text-white p-4 flex flex-col shadow-lg border-r border-gray-700 backdrop-blur-md overflow-auto text-base"
          style={{ fontFamily: "var(--font-Iceland)" }}
        >
          <button
            onClick={() => setShowSideBar(false)}
            className="absolute top-3 right-3 w-8 h-8 bg-cyan-400 text-black font-bold rounded-full shadow-lg hover:bg-cyan-500 flex items-center justify-center z-50 transition-all duration-200 text-lg"
          >
            ×
          </button>

          <h2 className="font-extrabold text-3xl mb-1 text-cyan-400 drop-shadow-lg">
            Asteroid Info
          </h2>

          {!selectedNeo ? (
            <p className="text-gray-400 text-sm">Loading asteroid data...</p>
          ) : (
            <div className="space-y-3">
              {/* Top Section */}
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1 flex-grow">
                  <p><span className="font-semibold text-cyan-300">Name:</span> {selectedNeo.name}</p>
                  <p><span className="font-semibold text-cyan-300">ID:</span> {selectedNeo.id}</p>
                  <p><span className="font-semibold text-cyan-300">Diameter:</span> {((selectedNeo.estimated_diameter.kilometers.estimated_diameter_min + selectedNeo.estimated_diameter.kilometers.estimated_diameter_max)/2).toFixed(3)} km</p>
                  <p className="flex items-center gap-1">
                    <span className="font-semibold text-cyan-300">Hazardous:</span> 
                    {selectedNeo.is_potentially_hazardous_asteroid ? (
                      <>
                        <span className="text-red-400 font-bold">Yes</span>
                        <Link href="/Mitigation">
                          <button className="ml-1 px-3 py-0.5 text-orange-500 rounded hover:bg-orange-600 transition-colors text-sm whitespace-nowrap">
                            Mitigation
                          </button>
                        </Link>
                      </>
                    ) : "No"}
                  </p>
                  <p><span className="font-semibold text-cyan-300">Magnitude:</span> {selectedNeo.absolute_magnitude_h}</p>
                </div>
                <div className="flex-shrink-0 w-44 h-44">
                  <img src="assets/astan.gif" alt="Asteroid" className="object-contain rounded-lg"/>
                </div>
              </div>

              {/* Close Approaches */}
              <div>
                <p className="font-semibold text-cyan-300">Close Approaches:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-0.5 mt-1">
                  {selectedNeo.close_approach_data.map((entry, idx) => (
                    <li key={idx} className="text-sm">
                      <span className="text-white">{entry.close_approach_date}</span> - Miss: <span className="text-yellow-400">{parseFloat(entry.miss_distance.kilometers).toLocaleString()} km</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Orbital Data */}
              <div>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-semibold text-cyan-300">Orbital Data:</p>
                  <button onClick={() => setShowJargon(!showJargon)} className="text-sm text-blue-400 hover:text-blue-300 underline">
                    {showJargon ? "Hide Jargons" : "Show Jargons"}
                  </button>
                </div>
                {loadingOrbital && <p className="text-gray-400 text-sm mt-1">Loading...</p>}
                {orbitalData && (
                  <ul className="list-disc list-inside text-gray-300 space-y-0.5 mt-1">
                    {jargonList.map((term) => (
                      <li key={term.key} className="text-sm">
                        <a href={term.wiki} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:text-blue-300 underline">
                          {term.label}:
                        </a>{" "}
                        {orbitalData[term.key]}
                        {showJargon && <div className="text-gray-400 text-xs mt-0.5 ml-2">{term.desc}</div>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <a className="inline-block text-blue-400 hover:text-blue-300 underline font-medium text-sm mt-1" href={selectedNeo.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
                View on JPL Database
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}

