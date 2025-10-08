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
    const invertedZoom = 100 - sliderValue;
    setZoom(invertedZoom as ZoomValue);
  };

  return (
    <div className="flex items-center gap-3 w-fit z-50">
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={100 - zoom}
        onChange={handleChange}
        className="w-36 h-2 appearance-none rounded-lg bg-zinc-800 cursor-pointer hover:bg-zinc-700"
      />
      <div className="text-xs font-mono text-zinc-300 w-8 text-center">
        {100 - zoom}
      </div>
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #a1a1aa; /* zinc-400 */
          cursor: pointer;
          border: 2px solid #52525b; /* zinc-600 */
          transition: background 0.2s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          background: #d4d4d8; /* zinc-300 */
        }
        input[type='range']::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #a1a1aa;
          cursor: pointer;
          border: 2px solid #52525b;
          transition: background 0.2s;
        }
      `}</style>
    </div>
  );
}

