"use client";

import { useAtom, useAtomValue } from "jotai";
import {
  asteroidsAtom,
  currentObjectId,
  PlotAtom,
  orbitTargetAtom,
  Neo,
  showInfoBarAtom,
} from "../store";
import { useState } from "react";
import * as THREE from "three";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image"; // Change #1: Import the Next.js Image component

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function InfoBar() {
  const data = useAtomValue(asteroidsAtom);
  const plotData = useAtomValue(PlotAtom);
  const [currentId, setCurrentObjectId] = useAtom(currentObjectId);
  const [, setOrbitObject] = useAtom(orbitTargetAtom);
  const [showSideBar, setShowSideBar] = useAtom(showInfoBarAtom);
  const [filterHazardous, setFilterHazardous] = useState<"ALL" | "YES" | "NO">(
    "ALL",
  );

  let selectedNeo: Neo | null = null;
  if (data && currentId) {
    for (const date in data.near_earth_objects) {
      const neos: Neo[] = data.near_earth_objects[date];
      const found = neos.find((neo) => neo.id === currentId);
      if (found) {
        selectedNeo = found;
        break;
      }
    }
  }

  const allNeos: Neo[] = [];
  if (data) {
    for (const date in data.near_earth_objects)
      allNeos.push(...data.near_earth_objects[date]);
  }

  const filteredNeos = allNeos
    .filter((neo) => !!plotData[neo.id])
    .filter((neo) => {
      if (filterHazardous === "ALL") return true;
      return filterHazardous === "YES"
        ? neo.is_potentially_hazardous_asteroid
        : !neo.is_potentially_hazardous_asteroid;
    });

  const handleClick = (neo: Neo) => {
    setCurrentObjectId(neo.id);
    const ephemeris = plotData[neo.id];
    if (!ephemeris || Object.keys(ephemeris).length < 2) return;

    const sortedEntries = Object.entries(ephemeris).sort(
      ([a], [b]) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const points: THREE.Vector3[] = sortedEntries
      .map(
        // Change #2: Disable the ESLint warning for the unused '_' variable
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, entry]) =>
          new THREE.Vector3(
            entry.pos[0] / 1e6 + 149,
            entry.pos[1] / 1e6,
            entry.pos[2] / 1e6,
          ),
      )
      .reverse();

    setOrbitObject(points[points.length - 1]);
  };

  const sidebarVariants: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 30, stiffness: 150 },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const isSmallScreen =
    typeof window !== "undefined" ? window.innerWidth < 400 : false;

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #303030;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #454545;
        }
      `}</style>

      <AnimatePresence>
        {!showSideBar && !isSmallScreen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSideBar(true)}
            className="fixed cursor-pointer top-4 right-4 z-50 w-9 h-9 bg-zinc-900/50 text-zinc-300 rounded-md shadow-lg flex items-center justify-center backdrop-blur-sm border border-zinc-700 hover:bg-zinc-800 transition-colors"
          >
            <MenuIcon />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSideBar && (
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full z-50 p-4 border-l border-zinc-800 flex flex-col text-zinc-300 font-mine"
            style={{
              width: "40%",
              background:
                "linear-gradient(160deg, rgba(15,15,17,0.9) 0%, rgba(5,5,5,0.97) 100%)",
              backdropFilter: "blur(16px)",
            }}
          >
            <button
              onClick={() => setShowSideBar(false)}
              className="absolute top-4 right-4 w-7 h-7 text-zinc-500 hover:text-white flex items-center justify-center rounded transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>

            <h2 className="text-xl font-Iceland font-bold mb-3">Object Data</h2>

            <div className="flex-grow overflow-y-auto pr-2 -mr-2 custom-scrollbar space-y-3">
              {selectedNeo && (
                <motion.div variants={itemVariants}>
                  {/* Change #3: Add relative position to parent and replace <img> with <Image> */}
                  <div className="relative w-full h-28 flex items-center justify-center mb-2">
                    <Image
                      src="/assets/astan.gif" // Path must be relative to the 'public' folder
                      alt="Asteroid"
                      fill // Fills the parent container
                      style={{
                        objectFit: "contain", // Corresponds to object-contain
                        mixBlendMode: "screen",
                      }}
                      unoptimized // Recommended for GIFs to prevent breaking animation
                    />
                  </div>

                  <div className="p-2.5 bg-black/20 rounded-md border border-zinc-800 text-sm space-y-1">
                    <p className="text-base font-bold text-white truncate">
                      {selectedNeo.name}
                    </p>
                    <p className="text-xs text-zinc-400 font-mono">
                      ID: {selectedNeo.id}
                    </p>
                    <p>
                      <span className="text-zinc-400">Diameter:</span>{" "}
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
                      <span className="text-zinc-400">Hazardous:</span>{" "}
                      {selectedNeo.is_potentially_hazardous_asteroid ? (
                        <span className="text-red-400 font-bold">Yes</span>
                      ) : (
                        "No"
                      )}
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <p className="text-sm font-semibold text-zinc-400 mb-1 px-1">
                  Close Approaches
                </p>
                <div className="max-h-28 overflow-y-auto space-y-1 pr-1 custom-scrollbar text-xs">
                  {selectedNeo ? (
                    selectedNeo.close_approach_data.map((entry) => (
                      <div
                        key={entry.close_approach_date}
                        className="p-1.5 bg-zinc-1000/50 rounded-md border border-zinc-700/80"
                      >
                        <p className="font-semibold text-white">
                          {entry.close_approach_date}
                        </p>
                        <p className="text-zinc-400">
                          Miss by:{" "}
                          {parseFloat(
                            entry.miss_distance.kilometers,
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}{" "}
                          km
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-1.5 bg-zinc-1000/50 rounded-md border border-zinc-700/80">
                      <p className="font-semibold text-white">--</p>
                      <p className="text-zinc-400">Miss by: --</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-sm font-semibold text-zinc-400 mb-1 px-1">
                  Asteroid List
                </p>
                <div className="flex gap-2 mb-2 text-xs font-semibold">
                  {["ALL", "YES", "NO"].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setFilterHazardous(type as "ALL" | "YES" | "NO")
                      }
                      className="px-2 py-1 rounded-md border bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      {type === "ALL"
                        ? "All"
                        : type === "YES"
                          ? "Hazardous"
                          : "Non-Hazardous"}
                    </button>
                  ))}
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar text-xs">
                  {filteredNeos.length === 0 ? (
                    <p className="text-zinc-500">No asteroids found.</p>
                  ) : (
                    filteredNeos.map((neo) => {
                      const isSelected = neo.id === currentId;
                      return (
                        <div
                          key={neo.id}
                          onClick={() => handleClick(neo)}
                          className={`cursor-pointer border rounded-md p-1.5 flex justify-between items-center bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white transition-all ${
                            isSelected ? "scale-105" : ""
                          }`}
                        >
                          <span className="truncate">{neo.name}</span>
                          <span className="text-xs">
                            {neo.is_potentially_hazardous_asteroid ? "!" : ""}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
