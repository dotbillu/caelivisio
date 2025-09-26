import React from "react";
import { DoubleSide } from "three";

export default function OrbitLines() {
  return (
    <>
      <mesh scale={[1, 1.2, 1]} position={[0,0,0]}>
        <torusGeometry args={[149,0.02,1000,1100]} />

        <meshStandardMaterial color="pink" side={DoubleSide} />
    
      </mesh>
    </>
  );
}


