"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import dynamic from "next/dynamic";
import Sidebar from "./components/sidebar";
import Table from "./components/right_table";
import GithubCorner from "react-github-corner";

const Earth = dynamic(() => import("./components/earth"), { ssr: false });

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 z-0 bg-black">
        <Earth />
      </div>

      {/* GitHub corner */}
      <div className="fixed top-0 left-0 z-50">
        <GithubCorner
          href="https://github.com/dotbillu/caelivisio"
          bannerColor="#151513"
          octoColor="#fff"
          size={80}
          direction="left"
        />
      </div>

      {/* Sidebar */}
      <div className="fixed top-4 left-4 z-40 mt-4">
        <Sidebar />
      </div>

      {/* Table */}
      <Table />
    </div>
  );
}
