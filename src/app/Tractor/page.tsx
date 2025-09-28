"use client";
import React, { useState } from "react";

const StagedAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState("launching");

  const handleLaunchComplete = () => {
    setAnimationPhase("orbiting");
  };

  return (
    <>
      <style>{`
        @keyframes launch-and-travel {
          0% { transform: translate(0,0) rotate(-45deg); opacity: 0; }
          15% { transform: translate(50px,-150px) rotate(-45deg); opacity: 1; }
          80% { transform: translate(60vw,-300px) rotate(45deg); }
          100% { transform: translate(calc(100vw - 450px),-250px) rotate(90deg); opacity: 0; }
        }

        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ship-counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .launching-ship { animation: launch-and-travel 8s ease-in-out forwards; }
        .orbit-path { animation: orbit-spin 20s linear infinite; }
        .orbiting-ship { animation: ship-counter-spin 20s linear infinite; }
      `}</style>

      <div className="w-screen h-screen bg-gradient-to-b from-[#0c0a1f] to-[#1c1642] relative overflow-hidden flex justify-between items-end p-10 box-border">
        {/* Earth */}
        <div className="w-24 h-24 bg-blue-500 rounded-full self-end shadow-inner shadow-black/30"></div>

        {/* Asteroid Group */}
        <div className="absolute top-20 right-36 flex justify-center items-center">
          <div className="w-15 h-15 bg-[#8B4513] rounded-[50%_40%_30%_60%_/_40%_50%_60%_30%] absolute shadow-inner shadow-black/30"></div>

          {/* Orbit Phase */}
          {animationPhase === "orbiting" && (
            <>
              <div className="w-52 h-52 rounded-full border-2 border-dashed border-white/20 relative orbit-path">
                <div className="absolute top-[-15px] left-[85px] text-2xl orbiting-ship">🚀</div>
              </div>
            </>
          )}
        </div>

        {/* Launch Phase */}
        {animationPhase === "launching" && (
          <div
            className="absolute bottom-20 left-20 text-2xl z-10 launching-ship"
            onAnimationEnd={handleLaunchComplete}
          >
            🚀
          </div>
        )}

        {/* Top-right info box */}
        <div className="absolute top-10 left-10 w-72 p-4 bg-white/20 backdrop-blur-md text-white text-sm rounded shadow-lg">
          🚀 The tractor ship generates a gravitational pull to attract and hold the asteroid. During launch, it moves toward the target and gradually adjusts its orbit to maintain stable control using gravity-based mechanics.
        </div>
      </div>
    </>
  );
};

export default StagedAnimation;

