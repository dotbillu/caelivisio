// components/Asteroids.tsx
import {
  asteroidsAtom,
  currentObjectId,
  EphemerisEntry,
  Neo,
  orbitTargetAtom,
  showInfoBarAtom,
} from "@/app/store";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAsteroids } from "./useAsteroids";
import { useAtom, useAtomValue } from "jotai";
import { useRef } from "react";

export default function Asteroids() {
  const { plotData } = useAsteroids();
  const asteroidFeed = useAtomValue(asteroidsAtom);
  const [, setInfoBar] = useAtom(showInfoBarAtom);
  const [AsteroidTexture] = useLoader(THREE.TextureLoader, [
    "/assets/asteroid.jpg",
  ]);

  const [, setOrbitObject] = useAtom(orbitTargetAtom);
  const [, setCurrentObjectId] = useAtom(currentObjectId);
  const currentId = useAtomValue(currentObjectId);

  const shapeMapRef = useRef<{ [id: string]: number }>({});
  const squareref = useRef<THREE.LineSegments>(null!);
  const { camera } = useThree();

  useFrame(() => {
    if (squareref.current) {
      squareref.current.quaternion.copy(camera.quaternion);
    }
  });

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
  
  // New helper function to check if an asteroid is hazardous
  const isHazardous = (id: string): boolean => {
    if (!asteroidFeed) return false;
    for (const date in asteroidFeed.near_earth_objects) {
      const neos: Neo[] = asteroidFeed.near_earth_objects[date];
      const found = neos.find((neo) => neo.id === id);
      if (found) {
        return found.is_potentially_hazardous_asteroid;
      }
    }
    return false;
  };

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
          setOrbitObject(lastPosition);
          setCurrentObjectId(asteroidId);
          setInfoBar(true);
        };

        if (!shapeMapRef.current[asteroidId]) {
          shapeMapRef.current[asteroidId] = Math.floor(Math.random() * 32) + 1;
        }

        const shape = shapeMapRef.current[asteroidId];
        const isSelected = asteroidId === currentId;
        const isAstHazardous = isHazardous(asteroidId); 

        return (
          <group key={asteroidId}>
            <mesh>
              <tubeGeometry args={[curve, 64, shape / 10000, 10, false]} />
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
              {isSelected && isAstHazardous && (
                <mesh>
                  {(() => {
                    const localStart = new THREE.Vector3(0, 0, 0);

                    const sunPosition = new THREE.Vector3(149, 0, 0);
                    const localEnd = sunPosition.clone().sub(lastPosition);

                    const lineCurve = new THREE.LineCurve3(localStart, localEnd);

                    return <tubeGeometry args={[lineCurve, 1, 0.05, 8, false]} />;
                  })()}
                  <meshStandardMaterial color="red" />
                </mesh>
              )}

              <mesh>
                <sphereGeometry
                  args={[getAsteroidSize(asteroidId), shape, 16]}
                />
                <meshStandardMaterial map={AsteroidTexture} color="white" />
              </mesh>

              {isSelected && (
                <lineSegments ref={squareref}>
                  <edgesGeometry args={[new THREE.PlaneGeometry(5, 5)]} />
                  <lineBasicMaterial color="blue" />
                </lineSegments>
              )}
            </group>
          </group>
        );
      })}
    </>
  );
}
