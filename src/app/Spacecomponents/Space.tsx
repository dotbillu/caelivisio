"use client";
import { Canvas} from "@react-three/fiber";
import Orbit from "./orbit";
import Controls from "./Controls";


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
