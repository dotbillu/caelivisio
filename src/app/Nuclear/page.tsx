"use client"
import React, { useState, useEffect } from 'react';

// All CSS styles are embedded directly within the component file.
const NuclearOptionAnimationStyles = () => (
  <style>{`
    /* Global reset for full-page effect */
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: #0c0a1f; /* Match scene background to avoid flashes */
    }

    /* Main container for the entire scene, now full-screen */
    .nuclear-scene-container {
      display: flex;
      justify-content: space-between; /* Puts Earth and Asteroid on opposite sides */
      align-items: center;
      position: relative;
      width: 100vw; /* Full viewport width */
      height: 100vh; /* Full viewport height */
      background: #0c0a1f;
      overflow: hidden;
      padding: 0 10vw; /* Use responsive padding */
      box-sizing: border-box;
    }

    /* === EARTH (Origin) === */
    .earth-orbit {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: relative;
      /* Layered gradients to simulate continents and oceans */
      background: 
        /* Small green landmass */
        radial-gradient(circle at 30% 40%, #22c55e 12px, transparent 13px),
        /* Larger green landmass */
        radial-gradient(circle at 65% 70%, #16a34a 25px, transparent 26px),
        /* Ocean base layer with a slight highlight */
        radial-gradient(circle at 30% 30%, #60a5fa, #3b82f6);
      
      /* Enhanced shadow for depth and a soft outer glow for atmosphere */
      box-shadow: 
        inset 20px 0px 30px rgba(0, 0, 0, 0.5), 
        0 0 25px -5px rgba(59, 130, 246, 0.7);
    }

    /* === THE ASTEROID === */
    .asteroid-deflection {
      width: 150px;
      height: 150px;
      background-color: #5d4037; /* Darker Brown */
      border-radius: 45% 55% 60% 40% / 55% 45% 55% 45%;
      position: relative;
      box-shadow: inset -25px -25px 40px rgba(0,0,0,0.5);
      transition: transform 5s ease-out; /* Smooth movement when pushed */
    }

    /* Class added after explosion to push the asteroid with responsive units */
    .asteroid-deflection.is-pushed {
      transform: translate(10vw, -5vh) rotate(15deg);
    }
    
    /* === PHASE 1: THE DEVICE APPROACH === */
    .missile {
      font-size: 24px;
      position: absolute;
      /* Initial position is near Earth, vertically centered */
      left: 15vw; 
      top: 50%;
      transform: translateY(-50%);
      animation: missile-approach-from-earth 5s ease-in-out forwards;
    }

    @keyframes missile-approach-from-earth {
      0% {
        /* Start centered vertically, ready to launch */
        transform: translate(0, -50%) rotate(0deg);
        opacity: 0;
      }
      20% {
        /* Lifts off and turns, using responsive units */
        transform: translate(5vw, -10vh) rotate(45deg);
        opacity: 1;
      }
      100% {
        /* Stops at a standoff distance from the asteroid, calculated responsively */
        transform: translate(calc(80vw - 300px), -15vh) rotate(90deg);
        opacity: 1;
      }
    }

    /* === PHASE 2: THE DETONATION === */
    .explosion-flash {
      position: absolute;
      /* Position the explosion where the missile stops, near the asteroid */
      right: calc(10vw + 150px); /* Aligns with the asteroid's general area */
      top: 35vh; /* Matches the missile's approximate end height */
      transform: translate(50%, -50%); /* Center the explosion flash on its coordinates */
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,229,153,1) 30%, rgba(255,159,0,0) 70%);
      border-radius: 50%;
      animation: flash-bang 0.5s ease-out forwards;
    }
    
    @keyframes flash-bang {
      0% { 
        transform: translate(50%, -50%) scale(0);
        opacity: 1;
      }
      80% {
        transform: translate(50%, -50%) scale(1.5);
        opacity: 0.8;
       }
      100% {
        transform: translate(50%, -50%) scale(1.3);
        opacity: 0;
      }
    }

    /* === PHASE 3: VAPORIZED SURFACE === */
    .asteroid-surface-vaporized {
      position: absolute;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      border-radius: 50%;
      opacity: 0;
    }

    .asteroid-deflection.is-pushed .asteroid-surface-vaporized {
        /* The glow effect on the surface */
      background: radial-gradient(circle, rgba(255,130,0,0.8) 0%, rgba(255,80,0,0) 60%);
      animation: vaporize-glow 3s ease-out forwards;
    }

    @keyframes vaporize-glow {
      0% {
        opacity: 0;
        transform: scale(0.5);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(1.2);
      }
    }
  `}</style>
);

const NuclearOptionAnimation = () => {
  // State to control the animation phase
  const [phase, setPhase] = useState('approaching');

  const handleApproachEnd = () => {
    setPhase('detonating');
    // After the flash animation (0.5s), start the push phase
    setTimeout(() => {
      setPhase('pushed');
    }, 500);
  };
 
  // Effect to restart the animation for demonstration purposes
  useEffect(() => {
    if (phase === 'pushed') {
      const timer = setTimeout(() => {
        setPhase('approaching');
      }, 6000); // Reset after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <>
      <NuclearOptionAnimationStyles />
      <div className="nuclear-scene-container">
        
        <div className="earth-orbit"></div>

        <div className={`asteroid-deflection ${phase === 'pushed' ? 'is-pushed' : ''}`}>
          <div className="asteroid-surface-vaporized"></div>
        </div>

        {phase === 'approaching' && (
          <div className="missile" onAnimationEnd={handleApproachEnd}>
            🚀<span style={{color: 'orange', marginLeft: '-5px'}}>☢️</span>
          </div>
        )}

        {phase === 'detonating' && (
          <div className="explosion-flash"></div>
        )}

      </div>
    </>
  );
};

export default NuclearOptionAnimation;

