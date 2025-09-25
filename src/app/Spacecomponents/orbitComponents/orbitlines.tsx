import React from "react";
import { DoubleSide } from "three";

export default function OrbitLines() {
  const pi=Math.PI
  return (
    <>
      <mesh rotation={[-pi/2,-pi/ 20,0]}>
        <ringGeometry args={[300, 300.8, 64]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>
    </>
  );
}


