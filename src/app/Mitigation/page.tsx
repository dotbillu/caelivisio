"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import the Image component

// --- SVG Icons (No changes needed here) ---
const RocketIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S5.66 15.61 4.5 16.5Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.87 12.87 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const AtomIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
    <path d="M3.8 20.2c-2.04-2.03-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5 2.04 2.03.02 7.36-4.5 11.9-4.54 4.52-9.87-6.54-11.9-4.5Z" />
  </svg>
);
const MagnetIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6" />
    <path d="M12 15V3" />
    <path d="M18 9a6 6 0 0 0-12 0v8a6 6 0 0 0 12 0Z" />
    <path d="M12 3h.01" />
  </svg>
);
const SirenIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5Z" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.9 4.9 1.4 1.4" />
    <path d="m17.7 17.7 1.4 1.4" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.9 19.1 1.4-1.4" />
    <path d="m17.7 6.3 1.4-1.4" />
  </svg>
);

// --- Updated Strategy Data with more details and new color scheme ---
const strategies = [
  {
    title: "Kinetic Impactor",
    icon: RocketIcon,
    shortDesc:
      "Divert an asteroid by colliding a heavy, high-speed spacecraft into it.",
    details: (
      <div className="space-y-3">
        <p>
          This method works by the principle of momentum transfer (p=mv). The
          spacecraft, traveling at immense speed (e.g., 6 km/s), acts as a
          "bullet" to nudge the asteroid. It doesn't destroy the target but
          alters its velocity by a tiny fraction, which, over many years,
          results in a significant deviation from its original Earth-bound
          trajectory.
        </p>
        <p>
          The key is early detection. A small nudge applied decades before a
          potential impact is far more effective and requires less energy than a
          last-minute attempt.
        </p>
        <div className="font-semibold text-gray-200">
          Case Study: NASA's DART Mission
        </div>
        <ul className="list-disc list-inside text-gray-400 text-xs">
          <li>
            <strong>Target:</strong> Dimorphos (a 160m moonlet of asteroid
            Didymos).
          </li>
          <li>
            <strong>Impact Date:</strong> September 26, 2022.
          </li>
          <li>
            <strong>Result:</strong> Successfully shortened Dimorphos's orbit by
            32 minutes, proving the viability of this technique for planetary
            defense. The original goal was a mere 73-second change.
          </li>
          <li>
            <a
              href="https://science.nasa.gov/planetary-defense-dart/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300"
            >
              NASA DART Mission Source
            </a>
          </li>
        </ul>
        <div className="mt-4">
          <a
            href="/Nuclear"
            className="inline-block px-5 py-2 text-sm font-bold text-gray-900 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors duration-200"
          >
            Visualize Trajectory 🔗
          </a>
        </div>
      </div>
    ),
    color: "amber-400",
  },
  {
    title: "Gravity Tractor",
    icon: MagnetIcon,
    shortDesc:
      "Use a spacecraft's own gravity to gently tow an asteroid onto a new path.",
    details: (
      <div className="space-y-3">
        <p>
          Based on Newton's Law of Universal Gravitation, all objects with mass
          exert a gravitational pull. A gravity tractor is a heavy spacecraft
          that flies alongside an asteroid for an extended period (years or
          decades). Its tiny gravitational pull, though minuscule, is constant
          and continuously tugs the asteroid, slowly and predictably pulling it
          into a safe orbit.
        </p>
        <p>
          This is a highly controlled and delicate method, ideal for altering
          the course of asteroids without risking fragmentation. It requires
          precise station-keeping technology to maintain the spacecraft's
          position relative to the asteroid.
        </p>
        <div className="font-semibold text-gray-200">Method Feasibility:</div>
        <ul className="list-disc list-inside text-gray-400 text-xs">
          <li>
            <strong>Advantage:</strong> Precision and control. The effect is
            entirely predictable.
          </li>
          <li>
            <strong>Requirement:</strong> Long lead times (20+ years). Not
            suitable for immediate threats.
          </li>
          <li>
            <strong>Status:</strong> Conceptually proven, but has not yet been
            demonstrated in a full-scale mission.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Gravity_tractor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300"
            >
              Gravity Tractor Concept (Wikipedia)
            </a>
          </li>
        </ul>
        <div className="mt-4">
          <a
            href="/Tractor"
            className="inline-block px-5 py-2 text-sm font-bold text-gray-900 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors duration-200"
          >
            Visualize Pull Effect 🔗
          </a>
        </div>
      </div>
    ),
    color: "amber-400",
  },
  {
    title: "Nuclear Standoff Explosion",
    icon: AtomIcon,
    shortDesc:
      "Detonate a nuclear device at a distance to push the asteroid with radiation.",
    details: (
      <div className="space-y-3">
        <p>
          This is not about blowing the asteroid up. Instead, a nuclear device
          is detonated at a calculated "standoff" distance. The intense X-ray
          and neutron radiation from the blast instantly vaporizes a layer of
          the asteroid's surface. This vaporized material explodes outwards,
          creating a powerful thrust (ablation) that pushes the asteroid in the
          opposite direction.
        </p>
        <p>
          It's a high-power option considered a last resort for very large
          objects or those discovered too late for other methods. The primary
          risk is fracturing the asteroid into multiple, unpredictable threats.
        </p>
        <div className="font-semibold text-gray-200">Operational Profile:</div>
        <ul className="list-disc list-inside text-gray-400 text-xs">
          <li>
            <strong>Use Case:</strong> Large (&gt;500m) asteroids or
            short-warning scenarios.
          </li>
          <li>
            <strong>Risk:</strong> Potential for fragmentation if the asteroid
            is a loosely-held "rubble pile."
          </li>
          <li>
            <strong>Advantage:</strong> Delivers the most energy and deflection
            capability of any method.
          </li>
          <li>
            <a
              href="https://www.sciencedirect.com/science/article/abs/pii/S0094576512004031"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300"
            >
              ScienceDirect: Nuclear Deflection
            </a>
          </li>
        </ul>
        <div className="mt-4">
          <a
            href="/Nuclear"
            className="inline-block px-5 py-2 text-sm font-bold text-gray-900 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors duration-200"
          >
            Visualize Blast Deflection 🔗
          </a>
        </div>
      </div>
    ),
    color: "amber-400",
  },
  {
    title: "Civil Defense & Evacuation",
    icon: SirenIcon,
    shortDesc:
      "If impact is unavoidable, focus on saving lives through alerts and evacuation.",
    details: (
      <div className="space-y-3">
        <p>
          When mitigation is not possible due to late detection or failed
          attempts, the focus shifts from deflecting the object to protecting
          the population. International networks like IAWN (International
          Asteroid Warning Network) would provide governments with precise
          impact location and time data.
        </p>
        <p>
          Authorities like FEMA (in the US) would then use this data to issue
          public warnings, coordinate mass evacuations of the predicted impact
          zone, and prepare emergency response services. This strategy relies
          heavily on accurate orbital calculations and clear, timely
          communication to the public.
        </p>
        <div className="font-semibold text-gray-200">
          Key Agencies & Protocols:
        </div>
        <ul className="list-disc list-inside text-gray-400 text-xs">
          <li>
            <strong>Warning:</strong> International Asteroid Warning Network
            (IAWN).
          </li>
          <li>
            <strong>Coordination:</strong> Space Mission Planning Advisory Group
            (SMPAG).
          </li>
          <li>
            <strong>Action:</strong> National and local emergency management
            agencies (e.g., FEMA).
          </li>
          <li>
            <a
              href="https://ntrs.nasa.gov/api/citations/20230002499/downloads/PDC2023_Evac.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 underline hover:text-orange-300"
            >
              NASA Evacuation Guidelines (PDF)
            </a>
          </li>
        </ul>
      </div>
    ),
    color: "orange-400",
  },
];
const MitigationStrategies = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="relative flex min-h-screen">
      <div className="flex-1 p-4 sm:p-8 bg-black/70 text-gray-200 font-work-sans rounded-lg border border-gray-800 backdrop-blur-sm">
        <h2
          className="font-iceland text-4xl md:text-5xl font-bold mb-8 text-amber-400 tracking-wider"
          style={{
            fontFamily: "var(--font-Iceland)",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          Defend Earth
        </h2>

        <div className="space-y-4">
          {strategies.map((s, idx) => {
            const Icon = s.icon;
            const isExpanded = expandedIndex === idx;

            const borderColor = `hover:border-${s.color}`;
            const iconColor = `text-${s.color}`;
            const expandedBorderColor = isExpanded
              ? `border-${s.color}`
              : "border-gray-700";

            return (
              <div
                key={s.title}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={`bg-gray-900/50 p-4 rounded-lg border ${expandedBorderColor} ${borderColor} transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className="flex items-start space-x-4">
                  {s.title === "Civil Defense & Evacuation" && isExpanded && (
                    <div className="w-1/3 relative hidden lg:block">
                      <img
                        src="/assets/people.jpeg"
                        alt="People looking at the sky"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <Icon
                        className={`h-8 w-8 mt-1 flex-shrink-0 ${iconColor}`}
                        style={{
                          filter: `drop-shadow(0 0 5px var(--tw-shadow-color))`,
                        }}
                      />
                      <div>
                        <h4 className="font-iceland text-xl text-gray-100 tracking-wide">
                          {s.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {s.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-500 ease-in-out grid ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 pt-3"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden text-sm text-gray-300">
                        {s.details}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MitigationStrategies;

