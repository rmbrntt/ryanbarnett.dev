import React from "react";
import { motion } from "framer-motion";

export const QUANTUM_LINES = [
  {
    width: "2px",
    height: "60%",
    rotate: 45,
    translateX: "-50%",
    translateY: "-50%",
    color: "rgba(0, 255, 255, 0.8)",
  },
  {
    width: "2px",
    height: "80%",
    rotate: -45,
    translateX: "-50%",
    translateY: "-50%",
    color: "rgba(139, 31, 255, 0.8)",
  },
];

export const QuantumLine = ({
  width,
  height,
  rotate,
  translateX,
  translateY,
  color,
  onComplete,
  delay,
}) => {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
        onComplete: () => {
          if (onComplete) onComplete();
        },
      }}
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: color,
        transform: `translate(${translateX}, ${translateY}) rotate(${rotate}deg)`,
        transformOrigin: "center",
        willChange: "transform, opacity",
      }}
    />
  );
};

export default QuantumLine;
