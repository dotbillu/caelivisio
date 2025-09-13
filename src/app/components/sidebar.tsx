"use client";

import { useAtom } from "jotai";
import { DebrisStatusAtom, speedAtom, speedtype } from "./store";
import { useEffect } from "react";

export default function Sidebar() {
  return (
    <div className="fixed flex flex-col top-0 left-0 m-2 shadow shadow-gray-50 w-max h-[70%] rounded-[6px] bg-black/70 pl-1  pr-5 ">
      <div className="size-auto">
        <SpeedComponent />
      </div>
      <div>
        <DebrisToggleComponent />
      </div>
    </div>
  );
}

export function DebrisToggleComponent() {
  const [DebrisStatus, setDebrisStatus] = useAtom(DebrisStatusAtom);
  useEffect(() => {
    console.log(DebrisStatus);
  }, [DebrisStatus]);
  return (
    <div className=" flex justify-around ">
 <div>
Show Debris 
 </div>
 <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={DebrisStatus}
            onChange={() => setDebrisStatus((prev) => !prev)}
            className="sr-only peer"
          />
          <div className="w-7 h-3 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
}
function SpeedComponent() {
  const [speed, setSpeed] = useAtom(speedAtom);

  return (
    <>
      <div className="font-roboto-slab">Speed</div>
      <div className="w-40">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value) as speedtype)}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-auto cursor-pointer dark:bg-gray-700 accent-[#0EA513] active-border"
        />
        {/* markers */}
        <div className="flex justify-between px-1 mt-1 text-[10px] text-white">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </>
  );
}
