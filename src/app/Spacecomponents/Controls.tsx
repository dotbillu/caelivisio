import { useRef, useEffect, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; 
import { useAtom } from "jotai";
import { orbitTargetAtom, ZoomValueAtom, ZoomValue } from "../store";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export default function Controls() {
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const { camera } = useThree();
  const [orbitTarget] = useAtom(orbitTargetAtom);
  const [zoom, setZoom] = useAtom(ZoomValueAtom);

  const isInteractingRef = useRef(false);
  const isProgrammaticUpdateRef = useRef(false);

  useEffect(() => {
    console.log("Zoom atom value is now:", zoom);
  }, [zoom]);

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

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const currentDistance = controls.getDistance();
    if (Math.abs(currentDistance - zoom) < 0.01) return;
    isProgrammaticUpdateRef.current = true;
    const direction = camera.position.clone().sub(controls.target).normalize();
    const newPosition = controls.target.clone().add(direction.multiplyScalar(zoom));
    camera.position.copy(newPosition);
    controls.update();
    const timer = setTimeout(() => {
      isProgrammaticUpdateRef.current = false;
    }, 50);
    return () => clearTimeout(timer);
  }, [zoom, camera]);

  const updateUserZoom = useCallback(() => {
    if (isProgrammaticUpdateRef.current) return;
    if (!controlsRef.current) return;
    const currentDistance = controlsRef.current.getDistance();
    setZoom(currentDistance as ZoomValue);
  }, [setZoom]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      minDistance={10}
      maxDistance={300}
      rotateSpeed={0.4}
      enableZoom={true}
      zoomSpeed={1}
      onChange={updateUserZoom}
      onStart={() => {
        isInteractingRef.current = true;
      }}
      onEnd={() => {
        isInteractingRef.current = false;
        updateUserZoom();
      }}
    />
  );
}
