import React from "react";
import { DoubleSide } from "three";

export default function OrbitLines() {
  return (
    <>
      <mesh scale={[1, 1.2, 1]} position={[0,0,0]}>
        <torusGeometry args={[149,0.009,30,100]} />

        <meshStandardMaterial color="white" side={DoubleSide} />
    
      </mesh>
    </>
  );
}


