// components/Asteroids.tsx
import {
  asteroidsAtom,
  currentObjectId,
  EphemerisEntry,
  Neo,
  orbitTargetAtom,
} from "@/app/store";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useAsteroids } from "./useAsteroids";
import { useAtom, useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

export default function Asteroids() {
  const { plotData } = useAsteroids();
  const asteroidFeed = useAtomValue(asteroidsAtom);

  const [AsteroidTexture] = useLoader(THREE.TextureLoader, [
    "/assets/asteroid.jpg",
  ]);

  const getAsteroidSize = (id: string): number => {
    if (!asteroidFeed) return 0.05; // fallback size
    for (const date in asteroidFeed.near_earth_objects) {
      const neos: Neo[] = asteroidFeed.near_earth_objects[date];
      const found = neos.find((neo) => neo.id === id);
      if (found) {
        const { estimated_diameter } = found;
        const min = estimated_diameter.kilometers.estimated_diameter_min;
        const max = estimated_diameter.kilometers.estimated_diameter_max;
        return (min + max) / 2;
      }
    }
    return 0.05;
  };
  const [, setOrbitObject] = useAtom(orbitTargetAtom);
  const shapeMapRef = useRef<{ [id: string]: number }>({});
  const squareref = useRef<THREE.LineSegments>(null!);
  const { camera } = useThree();

  useFrame(() => {
    if (squareref.current) {
      squareref.current.quaternion.copy(camera.quaternion);
    }
  });

  const [, setCurrentObjectId] = useAtom(currentObjectId);
  return (
    <>
      {Object.entries(plotData).map(([asteroidId, ephemeris]) => {
        const ephemerisData = ephemeris as { [date: string]: EphemerisEntry };
        const sortedEntries = Object.entries(ephemerisData).sort(
          ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime(),
        );

        if (sortedEntries.length < 2) return null;

        const points = sortedEntries
          .map(([, entry]) => {
            const scaledPos = entry.pos.map((v, i) =>
              i === 0 ? v / 1e6 + 149 : v / 1e6,
            );
            return new THREE.Vector3(...scaledPos);
          })
          .reverse();

        const curve = new THREE.CatmullRomCurve3(points);
        const lastPosition = points[points.length - 1];

        const handleClick = () => {
          const axis = lastPosition;
          setOrbitObject(axis);
          setCurrentObjectId(asteroidId);
        };
        if (!shapeMapRef.current[asteroidId]) {
          shapeMapRef.current[asteroidId] = Math.floor(Math.random() * 32) + 1;
        }

        const shape = shapeMapRef.current[asteroidId];

        return (
          <group key={asteroidId}>
            <mesh>
              <tubeGeometry args={[curve, 64, shape / 1000, 10, false]} />

              <meshBasicMaterial color="white" transparent opacity={0.1} />
            </mesh>
            <group
              position={lastPosition}
              onClick={handleClick}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "default";
              }}
            >
              <mesh>
                <sphereGeometry
                  args={[getAsteroidSize(asteroidId), shape, 16]}
                />
                <meshStandardMaterial map={AsteroidTexture} />
              </mesh>
            </group>
          </group>
        );
      })}
    </>
  );
}
