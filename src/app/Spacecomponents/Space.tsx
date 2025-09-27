"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import OrbitLines from "./orbit";
import Asteroid from "./asteroids";
import { orbitTargetAtom, ZoomValueAtom } from "../store";
import { atom, useAtom } from "jotai";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import RandomStars from "./orbitComponents/RandomStars";
import Orbit from "./orbit";
import Controls from "./Controls";

// assume you already have

export default function Space() {
  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas camera={{ position: [20, -1000, 110], fov: 60 }}  gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={3} />
        <pointLight position={[20, 20, 20]} />
        <Orbit />
        <Controls />
      </Canvas>
    </div>
  );
}
