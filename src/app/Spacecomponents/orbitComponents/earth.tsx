"use client";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const oceanRef = useRef<THREE.Mesh>(null!);

  const [earthTexture, cloudsTexture, oceanTexture] = useLoader(THREE.TextureLoader, [
    "/assets/Albedo.jpg",
    "/assets/Clouds.png",
    "/assets/Ocean.png"
  ]);

  useFrame(() => {
    const rotSpeed = 0.0001;
    earthRef.current.rotation.y += rotSpeed;
    cloudsRef.current.rotation.y += rotSpeed * 2;
    oceanRef.current.rotation.y += rotSpeed;
  });

const position: [number, number, number] = [149.6, 20, 30];

  return (
    <>
      <mesh position={position} ref={oceanRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={oceanTexture} />
      </mesh>

      <mesh position={position} ref={earthRef}>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      <mesh position={position} ref={cloudsRef}>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.6} />
      </mesh>
    </>
  );
}

