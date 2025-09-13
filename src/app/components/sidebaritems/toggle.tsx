import { useAtom } from "jotai";
import { useEffect } from "react";
import { debrisstatusatom, payloadstatusatom, rocketbodystatusatom } from "../store";

export function DebrisToggleComponent() {
  const [DebrisStatus, setDebrisStatus] = useAtom(debrisstatusatom);
  useEffect(() => {
    console.log(DebrisStatus);
}, [DebrisStatus]);
  return (
    <div className=" flex justify-around ">
 <div className="font-Iceland">
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
  
export function RocketTogglecomponent() {
  const [RocketStatus, setRocketStatus] = useAtom(rocketbodystatusatom);
  useEffect(() => {
    console.log(RocketStatus);
  }, [RocketStatus]);
  return (
    <div className=" flex justify-around ">
 <div className="font-Iceland">
Show Rockets
 </div> 
 <div> 
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={RocketStatus} 
            onChange={() => setRocketStatus((prev) => !prev)}
            className="sr-only peer"
          />
          <div className="w-7 h-3 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
}

export function PayloadToggleButton() {
  const [payloadStatus, setPayloadStatus] = useAtom(payloadstatusatom);
  useEffect(() => {
    console.log(payloadStatus);
  }, [payloadStatus]);
  return (
    <div className=" flex justify-around ">
 <div className="font-Iceland">
Show Sattelite 
 </div>
 <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={payloadStatus} 
            onChange={() => setPayloadStatus((prev) => !prev)}
            className="sr-only peer"
          />
          <div className="w-7 h-3 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
}


