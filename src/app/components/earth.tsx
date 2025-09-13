"use client";
import 'dotenv'
import { Ion } from "cesium";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Viewer = dynamic(() => import("resium").then((mod) => mod.Viewer), {
  ssr: false,
});

export default function Earth() {
  const cesiumtoken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN;

  useEffect(() => {
    Ion.defaultAccessToken = cesiumtoken!;
    
  },[cesiumtoken]);


  return (
      <Viewer full />
  );
}
