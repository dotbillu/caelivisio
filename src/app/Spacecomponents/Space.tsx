"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Asteroids from "./asteroids";
import OrbitLines from "./orbit";

export default function Space() {
  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas camera={{ position: [300, 150, 300],fov:60 }
      }>
        <ambientLight intensity={3} />
        <pointLight position={[20, 20, 20]} />
        <Asteroids />
        <OrbitLines/>
        <OrbitControls
          minDistance={2}
          maxDistance={900}
          enablePan={true}
          rotateSpeed={0.4}
          enableZoom={true}
          zoomToCursor={true}
          zoomSpeed={1}
          autoRotate={true}
          autoRotateSpeed={0.01}
        />
      </Canvas>
    </div>
  );
}
