"use client";
import { orbitTargetAtom } from "@/app/store";
import { Effects, Select } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function SunComponent() {
  const SunRef = useRef<THREE.Mesh>(null!);

  const [SunTexture] = useLoader(THREE.TextureLoader, ["/assets/Sun.jpeg"]);

  useFrame(() => {
    const rotSpeed = 0.001;
    SunRef.current.rotation.y += rotSpeed;
  });
  const [orbitObject, setOrbitObject] = useAtom(orbitTargetAtom);

  const squareref = useRef<THREE.LineSegments>(null!);
  const { camera } = useThree();

  useFrame(() => {
    if (squareref.current) {
      squareref.current.quaternion.copy(camera.quaternion);
    }
  });

  const [showSelector, setShowSelector] = useState(false);
  const handleClick = () => {
    const axis = new THREE.Vector3(0, 0, 0);
   
    setOrbitObject(axis);
    setShowSelector(true);

    setTimeout(() => setShowSelector(false), 1000);
  };

  return (
    <>
      <group>
        <mesh
          ref={SunRef}
          position={[0, 0, 0]}
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
          {showSelector && (
            <lineSegments ref={squareref}>
              <edgesGeometry args={[new THREE.PlaneGeometry(10, 10)]} />
              <lineBasicMaterial color="gray" />
            </lineSegments>
          )}
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={SunTexture}
            emissive="yellow"
            emissiveIntensity={10}
          />
          <EffectComposer autoClear={false}>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.2}
            />
          </EffectComposer>
        </mesh>
      </group>{" "}
    </>
  );
}
