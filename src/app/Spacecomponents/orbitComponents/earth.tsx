"use client";
import { orbitTargetAtom } from "@/app/store";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const oceanRef = useRef<THREE.Mesh>(null!);
  const [orbitObject, setOrbitObject] = useAtom(orbitTargetAtom);
  const [earthTexture, cloudsTexture, oceanTexture] = useLoader(
    THREE.TextureLoader,
    ["/assets/Albedo.jpg", "/assets/Clouds.png", "/assets/Ocean.png"],
  );

  const squareref = useRef<THREE.LineSegments>(null!);
  const { camera } = useThree();

  useFrame(() => {
    if (squareref.current) {
      squareref.current.quaternion.copy(camera.quaternion);
    }
  });

  useFrame(() => {
    const rotSpeed = 0.0001;
    earthRef.current.rotation.y += rotSpeed;
    cloudsRef.current.rotation.y += rotSpeed * 2;
    oceanRef.current.rotation.y += rotSpeed;
  });
  const [showSelector, setShowSelector] = useState(false);

  const position: [number, number, number] = [100, 0, 0];
  const handleClick = () => {
    const axis = new THREE.Vector3(100, 0, 0);
       setOrbitObject(axis);
    setShowSelector(true);

    setTimeout(() => setShowSelector(false), 1000);
  };

  return (
    <group
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
      }}
      position={position}
    >
      {showSelector && (
        <lineSegments ref={squareref}>
          <edgesGeometry args={[new THREE.PlaneGeometry(5, 5)]} />
          <lineBasicMaterial color="gray" />
        </lineSegments>
      )}
      <mesh ref={oceanRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial map={oceanTexture} />
      </mesh>

      <mesh ref={earthRef}>
        <sphereGeometry args={[1.51, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.519, 32, 32]} />
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.6} />
      </mesh>
       <EffectComposer autoClear={false}>
          <Bloom
            intensity={1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.2}
          />
        </EffectComposer>
    </group>
  );
}
