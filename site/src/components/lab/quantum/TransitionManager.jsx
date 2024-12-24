import React from "react";
import { motion } from "framer-motion";

const TransitionManager = ({ state, fieldCoherence }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: state === "transitioning" ? fieldCoherence : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `radial-gradient(circle at center, 
          rgba(0, 255, 255, ${fieldCoherence * 0.4}) 0%, 
          rgba(139, 31, 255, ${fieldCoherence * 0.2}) 50%, 
          transparent 100%
        )`,
      }}
    />
  );
};

export default TransitionManager;
