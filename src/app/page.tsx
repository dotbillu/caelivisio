"use client";

import "cesium/Build/Cesium/Widgets/widgets.css"; // css import works in next
import dynamic from "next/dynamic";
import Sidebar from "./components/sidebar";

const Earth = dynamic(() => import("./components/earth"), { ssr: false });

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 z-0  bg-black">
        <Earth />
      </div>

      <div className="fixed top-4 left-4 z-50 mt-4">
        <Sidebar />
      </div>
    </div>
  );
}

