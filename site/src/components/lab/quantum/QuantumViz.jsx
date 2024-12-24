import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { QuantumLine, QUANTUM_LINES } from "./QuantumLine";
import QuantumSubstrate from "./QuantumSubstrate";
import TransitionManager from "./TransitionManager";
import ControlHints from "./ControlHints";
import ParticleSystem from "./ParticleSystem";

const QuantumViz = () => {
  const [phase, setPhase] = useState("init");
  const [completedLines, setCompletedLines] = useState(0);
  const [fieldCoherence, setFieldCoherence] = useState(0);
  const [substrateMode, setSubstrateMode] = useState("subtle");
  const [substrateRotation, setSubstrateRotation] = useState({
    x: -Math.PI * 0.15,
    y: 0,
    z: 0,
  });
  const [substrateInteractive, setSubstrateInteractive] = useState(false);
  const [transitionState, setTransitionState] = useState("normal");
  const [revealSubstrate, setRevealSubstrate] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showInteractionHints, setShowInteractionHints] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(null);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const transitionComplete = useRef(false);
  const containerRef = useRef(null);

  // Viewport detection
  useEffect(() => {
    const checkViewport = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      setViewport({ width: vw, height: vh });
      setIsMobile(vw <= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleLineComplete = () => {
    setCompletedLines((prev) => {
      const newCount = prev + 1;
      if (newCount >= QUANTUM_LINES.length) {
        setPhase("transition");
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (phase === "transition" && !transitionComplete.current) {
      setTransitionState("transitioning");
      setRevealSubstrate(true);

      const coherenceInterval = setInterval(
        () => {
          setFieldCoherence((prev) => {
            if (prev >= 1) {
              clearInterval(coherenceInterval);
              startParticleTransition();
              return 1;
            }
            return prev + (isMobile ? 0.03 : 0.02);
          });
        },
        isMobile ? 16 : 20
      );

      return () => clearInterval(coherenceInterval);
    }
  }, [phase, isMobile]);

  const startParticleTransition = () => {
    setTimeout(
      () => {
        setShowParticles(true);
        setPhase("complete");
        transitionComplete.current = true;
        setControlsEnabled(true);
        setShowInteractionHints(true);
        setTimeout(() => {
          setShowInteractionHints(false);
        }, 15000);
      },
      isMobile ? 2000 : 3000
    );
  };

  useEffect(() => {
    if (phase === "complete" && controlsEnabled) {
      let idleTimer;
      let hintTimer;

      const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        clearTimeout(hintTimer);
        setShowInteractionHints(false);

        idleTimer = setTimeout(() => {
          setIsIdle(true);
          setShowInteractionHints(true);

          hintTimer = setTimeout(() => {
            setShowInteractionHints(false);
            setIsIdle(false);
          }, 4000);
        }, 3000);
      };

      const events = [
        "mousemove",
        "mousedown",
        "wheel",
        "touchstart",
        "touchmove",
      ];
      for (const event of events) {
        window.addEventListener(event, resetIdleTimer);
      }

      resetIdleTimer();

      return () => {
        for (const event of events) {
          window.removeEventListener(event, resetIdleTimer);
        }
        clearTimeout(idleTimer);
        clearTimeout(hintTimer);
      };
    }
  }, [phase, controlsEnabled]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      id="quantum-container">
      <AnimatePresence mode="wait">
        {phase === "init" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {QUANTUM_LINES.map((line, index) => (
              <QuantumLine
                key={`line-${index}`}
                {...line}
                onComplete={handleLineComplete}
                delay={index * 200}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === "transition" || phase === "complete") && (
          <QuantumSubstrate
            mode={substrateMode}
            rotation={substrateRotation}
            interactive={substrateInteractive}
            reveal={revealSubstrate}
          />
        )}
      </AnimatePresence>

      {showParticles && (
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ParticleSystem />
          </Canvas>
        </div>
      )}

      <TransitionManager
        state={transitionState}
        fieldCoherence={fieldCoherence}
      />

      {showInteractionHints && (
        <ControlHints
          phase={currentPhase}
          isIdle={isIdle}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default QuantumViz;
