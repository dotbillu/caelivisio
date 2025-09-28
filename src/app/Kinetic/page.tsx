"use clien"
import React, { useState, useEffect } from 'react';

// All CSS styles are embedded directly within the component file.
const KineticImpactorAnimationStyles = () => (
  <style>{`
    /* Main container for the entire scene */
    .kinetic-scene-container {
      display: flex;
      justify-content: flex-start; /* Earth on the left */
      align-items: center;
      position: relative;
      width: 100%;
      height: 500px;
      background: linear-gradient(180deg, #0c0a1f 0%, #1c1642 100%);
      overflow: hidden;
      padding: 0 50px;
      box-sizing: border-box;
    }

    /* === EARTH (Origin) === */
    .earth-origin {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: relative;
      background: 
        radial-gradient(circle at 30% 40%, #22c55e 12px, transparent 13px),
        radial-gradient(circle at 65% 70%, #16a34a 25px, transparent 26px),
        radial-gradient(circle at 30% 30%, #60a5fa, #3b82f6);
      box-shadow: 
        inset 20px 0px 30px rgba(0, 0, 0, 0.5), 
        0 0 25px -5px rgba(59, 130, 246, 0.7);
      flex-shrink: 0; /* Prevents Earth from shrinking */
    }
    
    /* === ASTEROID & PATHS === */
    .trajectory-system {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 400px;
    }

    .original-path {
      width: 100%;
      height: 150px;
      border-bottom: 3px dashed rgba(255, 82, 82, 0.5); /* Red dashed line */
      border-radius: 50%;
      position: absolute;
      top: 125px;
      left: -150px;
      transform: rotate(-15deg);
    }
    
    .new-path {
      width: 100%;
      height: 250px; /* A different curve for the new path */
      border-bottom: 3px dashed rgba(34, 197, 94, 0.7); /* Green dashed line */
      border-radius: 50%;
      position: absolute;
      top: 150px;
      left: 200px;
      transform: rotate(25deg);
      opacity: 0; /* Initially hidden */
      transition: opacity 1s ease-in 1s; /* Fade in after a delay post-impact */
    }

    .new-path.is-visible {
      opacity: 1;
    }

    .asteroid-mover {
      width: 80px;
      height: 80px;
      position: absolute;
      animation: asteroid-travel 8s linear forwards;
      /* The transition for the deflection */
      transition: transform 4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    
    .asteroid-mover.is-deflected {
      /* This transform knocks it onto a new path */
      transform: translate(150px, 150px) rotate(30deg);
    }

    .asteroid-body {
      width: 100%;
      height: 100%;
      background-color: #5d4037;
      border-radius: 50% 45% 55% 40% / 45% 50% 40% 55%;
      box-shadow: inset -15px -15px 25px rgba(0,0,0,0.6);
    }

    @keyframes asteroid-travel {
      0% {
        top: 220px;
        left: -80px;
      }
      100% {
        top: 90px;
        left: 450px;
      }
    }
    
    /* === KINETIC IMPACTOR SPACECRAFT === */
    .impactor {
      font-size: 28px;
      position: absolute;
      animation: impactor-launch 7.8s ease-in-out forwards;
    }
    
    @keyframes impactor-launch {
      0% {
        opacity: 0;
        /* Start closer to Earth, launching upwards */
        transform: translate(80px, 300px) rotate(-60deg);
      }
      20% {
        opacity: 1;
      }
      100% {
        /* Target the asteroid's final position with a direct impact angle */
        transform: translate(460px, 80px) rotate(20deg);
        opacity: 1;
      }
    }

    /* === IMPACT VISUAL EFFECT === */
    .impact-flash {
      position: absolute;
      top: 90px;   /* Match asteroid final position */
      left: 450px; /* Match asteroid final position */
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, white 0%, rgba(255, 204, 0, 0.8) 40%, transparent 70%);
      border-radius: 50%;
      animation: impact-burst 0.4s ease-out forwards;
    }

    @keyframes impact-burst {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }
  `}</style>
);

const KineticImpactorAnimation = () => {
  const [phase, setPhase] = useState('approaching');

  const handleImpact = () => {
    setPhase('impact');
    // After the flash, deflect the asteroid
    setTimeout(() => {
      setPhase('deflected');
    }, 400); // Duration of the impact-burst animation
  };

  // Effect to restart the animation for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('approaching');
    }, 12000); // Reset after 12 seconds
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <>
      <KineticImpactorAnimationStyles />
      <div className="kinetic-scene-container">
        <div className="earth-origin"></div>

        <div className="trajectory-system">
          <div className="original-path"></div>
          <div className={`new-path ${phase === 'deflected' ? 'is-visible' : ''}`}></div>
          
          <div className={`asteroid-mover ${phase === 'deflected' ? 'is-deflected' : ''}`}>
            <div className="asteroid-body"></div>
          </div>

          {phase === 'approaching' && (
            <div className="impactor" onAnimationEnd={handleImpact}>🚀</div>
          )}

          {phase === 'impact' && <div className="impact-flash"></div>}
        </div>
      </div>
    </>
  );
};

export default KineticImpactorAnimation;
