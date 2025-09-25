"use client";


export default function SunComponent() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="yellow"
                emissive="yellow"
      emissiveIntensity={2}
        />
      </mesh>

    </>
  );
}
