import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CTA = ({ textVariants }: { textVariants: any }) => (
    <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
    variants={textVariants}
  >
    {/* Recent Thoughts */}
    {/* <div className="card bg-base-900/50 backdrop-blur-sm border-quantum-primary/20">
      <h3 className="text-quantum-primary text-lg mb-4">Recent Thoughts</h3>
      <div className="space-y-4">
        <a href="/thoughts/building-a-digital-garden" className="block group">
          <h4 className="text-base-50 group-hover:text-quantum-primary transition-colors">Building a Digital Garden</h4>
          <time className="text-sm text-base-300">February 19, 2024</time>
        </a>
        <a href="/thoughts/system-thinking" className="block group">
          <h4 className="text-base-50 group-hover:text-quantum-primary transition-colors">System Thinking and Software</h4>
          <time className="text-sm text-base-300">February 14, 2024</time>
        </a>
      </div>
    </div> */}

    {/* Active Projects */}
    {/* <div className="card bg-base-900/50 backdrop-blur-sm border-quantum-secondary/20">
      <h3 className="text-quantum-secondary text-lg mb-4">Active Projects</h3>
      <div className="space-y-4">
        <div className="group">
          <h4 className="text-base-50">Quantum Design System</h4>
          <p className="text-sm text-base-300">Building a unified design language</p>
        </div>
        <div className="group">
          <h4 className="text-base-50">Digital Garden</h4>
          <p className="text-sm text-base-300">Growing a knowledge ecosystem</p>
        </div>
      </div>
    </div> */}
  </motion.div>
)

export default function QuantumHero() {
  const [isVisible, setIsVisible] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div 
    className="relative h-full w-full "
    variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
{/* Quantum substrate background */}
<div className="absolute inset-0 bg-gradient-to-b from-base-950 to-base-900 opacity-90" />

{/* Main content container */}
<div className="h-full flex items-center xs:mt-8 sm:mt-24 md:mt-32 lg:mt-56">
  <div className="max-w-4xl w-full text-center px-4 mx-auto">
    <motion.h1 
      className="text-4xl font-medium text-base-50 leading-tight sm:text-5xl lg:text-6xl"
      variants={textVariants}
    >
      Technology × Human Potential
    </motion.h1>
    
    <motion.div
      className="text-xl text-base-200 sm:text-2xl mt-8"
      variants={textVariants}
    >
      Lead. Solve. Learn.
    </motion.div>

          {/* <CTA textVariants={textVariants} /> */}

        </div>

      </div>

                        {/* Explore CTA with improved positioning */}
                        {/* <motion.div 
        className="relative z-20 w-full flex justify-center"
        variants={textVariants}
      >
      </motion.div> */}
    </motion.div>
  );
}