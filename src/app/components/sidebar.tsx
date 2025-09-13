"use client";

import { useAtom } from "jotai";
import { speedAtom, speedtype } from "./store";
import {
  DebrisToggleComponent,
  PayloadToggleButton,
  RocketTogglecomponent,
} from "./sidebaritems/toggle";

export default function Sidebar() {
  return (
    <div className="fixed flex flex-col top-0 left-0 m-2 shadow shadow-gray-50 w-max h-max rounded-[6px] bg-black/70 pl-1  pr-10 pt-7 p-5  mt-10 ml-5">
      <div className="size-auto flex flex-col gap-y-5">
        <SpeedComponent />
        <DebrisToggleComponent />
        <RocketTogglecomponent />
        <PayloadToggleButton />
      </div>
    </div>
  );
}

function SpeedComponent() {
  const [speed, setSpeed] = useAtom(speedAtom);

  return (
    <>
      <div className=" ml-2 font-Iceland">Speed : {speed}</div>
      <div className="w-40">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value) as speedtype)}
          className="w-[90%] h-2 ml-2 bg-gray-200  appearance-auto cursor-pointer dark:bg-gray-700 accent-[#0EA513] active-border onhover"
        />
      </div>
    </>
  );
}
