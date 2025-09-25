import { Stars } from "@react-three/drei";

export default function RandomStars() {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={1}
        saturation={0.7}
        fade
      />
      <Stars
        radius={150}
        depth={80}
        count={700}
        factor={1}
        saturation={0.5}
        fade
      />
    </>
  );
}
