import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Earth from "./orbitComponents/earth";
import OrbitLines from "./orbitComponents/orbitlines";
import SunComponent from "./orbitComponents/Sun";
import * as THREE from "three";
import Asteroids from "./asteroids";
import RandomStarsExport from "./orbitComponents/RandomStars";

export default function Orbit() {
  const groupRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<THREE.Group>(null!); 

  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.rotation.z += 0.00001;
  //   }
  //
  //   if (starsRef.current) {
  //     starsRef.current.rotation.z += 0.0001; 
  //   }
  // });

  return (
    <group>
      <group ref={groupRef}>
        {/* <SunComponent /> */}
        <Earth />
        <OrbitLines />
        <Asteroids />
      </group>

      {/* <group ref={starsRef}> */}
      {/*   <RandomStarsExport /> */}
      {/* </group> */}
    </group>
  );
}

