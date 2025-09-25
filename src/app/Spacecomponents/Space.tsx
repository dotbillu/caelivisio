"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react"; 
import { useFrame } from "@react-three/fiber"; 
import OrbitLines from "./orbit";
import Asteroid from "./asteroids";
import { orbitTargetAtom } from "../store";
import { useAtom } from "jotai";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import RandomStars from "./orbitComponents/RandomStars";

function Controls() {
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const { camera } = useThree();
  const [orbitTarget] = useAtom(orbitTargetAtom);

  const isInteractingRef = useRef(false);

  useFrame(() => {
    if (isInteractingRef.current) return;
    
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const diff = orbitTarget.clone().sub(controls.target);

    if (diff.lengthSq() < 0.001) return;
    
    const panSpeed = 0.02; 
    diff.multiplyScalar(panSpeed);

    camera.position.add(diff);
    controls.target.add(diff);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      minDistance={3}
      maxDistance={200}
      rotateSpeed={0.4}
      enableZoom={true}
      zoomSpeed={3}
      onStart={() => {
        isInteractingRef.current = true;
      }}
      onEnd={() => {
        isInteractingRef.current = false;
      }}
    />
  );
}export default function Space() {
  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas camera={{ position: [20, -1000, 110], fov: 60 }}>
        <ambientLight intensity={3} />
        <pointLight position={[20, 20, 20]} />
        <Asteroid />
        <RandomStars />
        <OrbitLines />
        <Controls />
      </Canvas>
    </div>
  );
}

