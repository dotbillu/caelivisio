"use client";
import { Stars } from "@react-three/drei";
import React, { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

// The shared props interface for our star layers
interface StarLayerProps {
  count?: number;
  radius?: number;
  minRadius?: number;
  size?: number;
  color?: string;
  scale?: [number, number, number];
  zBias?: number;
}

const StarLayer: React.FC<StarLayerProps> = ({
  count = 5000,
  radius = 3000,
  minRadius = 0,
  size = 0.001,
  color = "#1A5C78",
  scale = [1, 1, 0.1],
  zBias = 3,
}) => {
  const [scaleX, scaleY, scaleZ] = scale;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const denseRadius = 150;

    for (let i = 0; i < count; i++) {
      const r =
        Math.random() < 0.7
          ? minRadius + Math.random() * denseRadius
          : denseRadius + Math.random() * (radius - denseRadius);

      const theta = Math.random() * 2 * Math.PI;

      const phiSign = Math.random() < 0.5 ? -1 : 1;
      const zFraction = Math.random() ** zBias;
      const z = r * zFraction * scaleZ * phiSign;
      const xyRadius = Math.sqrt(r * r - (z / scaleZ) ** 2);
      const x = xyRadius * Math.cos(theta) * scaleX;
      const y = xyRadius * Math.sin(theta) * scaleY;

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, radius, minRadius, scaleX, scaleY, scaleZ, zBias]);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color={color} size={size} sizeAttenuation={false} />
    </points>
  );
};

const RandomStarsExport: React.FC<StarLayerProps> = (props) => {
  return (
    <group>
      <StarLayer
        count={5000}
        radius={3000}
        size={0.001}
        color="#1A5C78"
        {...props}
      />
      <StarLayer count={2000} radius={500} size={0.01} color="gray" />
      <Stars
         radius= {1}
    depth= {900}
    count= {1000}
    factor= {2}
      />
  </group>
  );
};

export default RandomStarsExport;
