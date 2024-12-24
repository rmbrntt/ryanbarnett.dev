import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuBloch } from './MenuBloch';

interface ExploreBlochProps {
  onHover?: () => void;
  onLeave?: () => void;
}

export function ExploreBloch({ onHover, onLeave }: ExploreBlochProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleInteractionStart = useCallback(() => {
    setIsOpen(true);
    onHover?.();
  }, [onHover]);

  const handleInteractionEnd = useCallback(() => {
    setIsOpen(false);
    onLeave?.();
  }, [onLeave]);

  return (
    <div className="relative flex flex-col items-center">
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        onHoverStart={handleInteractionStart}
        onHoverEnd={handleInteractionEnd}
      >
        {/* Explore Button */}
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="relative text-sm font-medium text-quantum-primary">
            Explore
            <motion.span
              className="absolute -bottom-px left-0 right-0 h-px bg-quantum-primary/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "center" }}
            />
          </span>
          <motion.div 
            className="w-px h-16 bg-gradient-to-b from-quantum-primary/60 to-transparent mt-4"
            animate={{ 
              y: [0, 10, 0],
              opacity: isOpen ? 0.3 : 0.6
            }}
            transition={{ 
              y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.3
              }
            }}
          />
        </motion.div>

        {/* Quantum Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-full left-1/2 w-[300px] sm:w-[400px] mb-4"
              initial={{ 
                opacity: 0, 
                y: 20, 
                x: "-50%", 
                scale: 0.9,
                rotateX: -10
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                x: "-50%", 
                scale: 1,
                rotateX: 0
              }}
              exit={{ 
                opacity: 0, 
                y: 10, 
                x: "-50%", 
                scale: 0.95,
                rotateX: 10
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.3 }
              }}
            >
              <div className="absolute bottom-0 left-0 w-full h-4 translate-y-full" />
              
              <div className="relative bg-base-900/80 backdrop-blur-sm rounded-lg border border-quantum-primary/10 overflow-hidden">
                {/* Bloch Sphere Container */}
                <div className="relative -mt-20 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-quantum-primary/5 to-transparent rounded-full blur-3xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative -top-6">
                    <MenuBloch
                      size={200}
                      color="#88d0f3"
                      wireframe={true}
                      rotation={{ x: 0.001, y: 0.002, z: 0.001 }}
                      onHover={() => setActiveItem('sphere')}
                    />
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="p-4 space-y-1">
                  <motion.a
                    href="/lab/quantum-substrate"
                    className="block px-3 py-2 rounded-md text-sm text-quantum-primary/80 hover:text-quantum-primary hover:bg-quantum-primary/5 transition-colors relative group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onHoverStart={() => setActiveItem('substrate')}
                    onHoverEnd={() => setActiveItem(null)}
                  >
                    <span className="relative z-10">Quantum Substrate</span>
                    {activeItem === 'substrate' && (
                      <motion.div
                        className="absolute inset-0 bg-quantum-primary/5 rounded-md"
                        layoutId="activeBackground"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                  <motion.a
                    href="/lab/design-system"
                    className="block px-3 py-2 rounded-md text-sm text-quantum-primary/80 hover:text-quantum-primary hover:bg-quantum-primary/5 transition-colors relative group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onHoverStart={() => setActiveItem('design')}
                    onHoverEnd={() => setActiveItem(null)}
                  >
                    <span className="relative z-10">Design System</span>
                    {activeItem === 'design' && (
                      <motion.div
                        className="absolute inset-0 bg-quantum-primary/5 rounded-md"
                        layoutId="activeBackground"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 