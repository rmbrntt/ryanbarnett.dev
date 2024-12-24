import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ControlHints = ({ phase, isIdle, isMobile }) => {
  const getHintText = () => {
    if (isMobile) {
      return "Touch and drag to interact";
    }

    if (isIdle) {
      return "Move your mouse to interact";
    }

    switch (phase) {
      case "initial":
        return "Move your mouse to begin";
      case "active":
        return "Keep moving to explore";
      case "final":
        return "Click to reset";
      default:
        return "";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}>
        <p className="text-white text-lg font-light tracking-wide">
          {getHintText()}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default ControlHints;
