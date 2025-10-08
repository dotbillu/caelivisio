"use client";
import Space from "./Spacecomponents/Space";
import InfoBar from "./UIcomponents/Infobar";

import ZoomSlider from "./UIcomponents/zoomSlider";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      {/* React Three Fiber Canvas */}
      <div className="absolute inset-0 z-0">
        <Space />
      </div>

      {/* UI Layer */}
      <div className="absolute w-full top-0 left-0 z-10">
        <InfoBar />
      </div>
      
      {/* Example: bottom UI (zoom slider) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <ZoomSlider />
      </div>
    </div>
  );
}
