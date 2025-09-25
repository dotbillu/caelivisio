import { useAtom } from "jotai";
import { ZoomValue, ZoomValueAtom } from "../store";
import { useEffect, useState } from "react";
export default function ZoomSlider() {
  const [zoom, setZoom] = useState<ZoomValue>(2);
  const [, setValue] = useAtom(ZoomValueAtom);

  useEffect(() => {
    setValue(zoom);
  }, [zoom, setValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    // Ensure value is valid ZoomValue
    if (val >= 3 && val <= 900) {
      setZoom(val as ZoomValue);
    }
  };

  return (
    <div className="z-top bg-gray-200 flex justify-between w-fit">
      <div>
        <input
          type="range"
          min={3}
          max={900}
          step={1}
          value={zoom}
          onChange={handleChange}
          className="w-[90%] h-2 ml-2  appearance-auto cursor-pointer dark:bg-gray-700 accent-[#0EA513] active-border onhover"
        />
      </div>
      <div className=""> {zoom/10}</div>
    </div>
  );
}
