import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuantumLine, QUANTUM_LINES } from "./quantum/QuantumLine";
import QuantumSubstrate from "./quantum/QuantumSubstrate";
import TransitionManager from "./quantum/TransitionManager";
import ControlHints from "./quantum/ControlHints";
import { initIncend, cleanupIncend } from "./quantum/main";

const QuantumViz = () => {
  const [phase, setPhase] = useState("init");
  const [completedLines, setCompletedLines] = useState(0);
  const [fieldCoherence, setFieldCoherence] = useState(0);
  const [incendInstance, setIncendInstance] = useState(null);
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

  useEffect(() => {
    if (phase === "transition" && !transitionComplete.current) {
      setTransitionState("transitioning");
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

  const startParticleTransition = async () => {
    const container = document.getElementById("quantum-container");
    if (container) {
      if (incendInstance) {
        cleanupIncend(incendInstance);
      }

      try {
        const instance = initIncend("quantum-container", {
          initialState: {
            fieldCoherence: 1,
            blendWithSubstrate: true,
            transitionDuration: isMobile ? 2000 : 3000,
            isMobile: isMobile,
            viewport: viewport,
          },
        });

        setIncendInstance(instance);

        if (instance?.visualization?.system) {
          instance.visualization.system.transitionToParticles(
            isMobile ? 2000 : 3000
          );

          setTimeout(
            () => {
              setPhase("complete");
              transitionComplete.current = true;
            },
            isMobile ? 2000 : 3000
          );
        }
      } catch (error) {
        console.error("Error during particle transition:", error);
      }
    }
  };

  const handleLineComplete = () => {
    setCompletedLines((prev) => prev + 1);
    if (completedLines + 1 === QUANTUM_LINES.length) {
      setPhase("transition");
    }
  };

  useEffect(() => {
    return () => {
      if (incendInstance) {
        cleanupIncend(incendInstance);
      }
    };
  }, [incendInstance]);

  useEffect(() => {
    if (phase === "complete" && incendInstance?.visualization?.system) {
      const system = incendInstance.visualization.system;

      system.on("onPhaseComplete", (phase) => {
        setCurrentPhase(phase);
      });

      system.on("onControlsEnabled", () => {
        setControlsEnabled(true);
        setTimeout(() => {
          setShowInteractionHints(true);
          setTimeout(() => {
            setShowInteractionHints(false);
          }, 15000);
        }, 2000);
      });

      system.performIntroSequence();
    }
  }, [phase, incendInstance]);

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
      events.forEach((event) => {
        window.addEventListener(event, resetIdleTimer);
      });

      resetIdleTimer();

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, resetIdleTimer);
        });
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
      <AnimatePresence>
        {phase === "init" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {QUANTUM_LINES.map((line, index) => (
              <QuantumLine
                key={index}
                {...line}
                onComplete={handleLineComplete}
                delay={index * 200}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <QuantumSubstrate
        mode={substrateMode}
        rotation={substrateRotation}
        interactive={substrateInteractive}
        reveal={revealSubstrate}
      />

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
