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
    const sliderValue = Number(e.target.value);
    // Invert the slider value to calculate the zoom level
    const invertedZoom = 100 - sliderValue;
    setZoom(invertedZoom as ZoomValue);
  };

  return (
    <div className="z-top bg-gray-200 flex justify-between w-fit">
      <div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={100 - zoom}
          onChange={handleChange}
          className="w-[90%] h-2 ml-2 appearance-auto cursor-pointer dark:bg-gray-700 accent-[#0EA513] active-border onhover"
        />
      </div>
      <div>{100-zoom}</div>
    </div>
  );
}

