import React from 'react';
import { cn } from '../../lib/utils';

interface QuantumSubstrateProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'sunken';
  glowIntensity?: 'none' | 'low' | 'medium' | 'high';
}

export function QuantumSubstrate({ 
  className, 
  children,
  variant = 'default',
  glowIntensity = 'medium' 
}: QuantumSubstrateProps) {
  const variantStyles = {
    default: 'bg-black/40 dark:bg-black/60',
    elevated: 'bg-black/20 dark:bg-black/40',
    sunken: 'bg-black/60 dark:bg-black/80'
  };

  const glowStyles = {
    none: '',
    low: 'shadow-[0_0_30px_-10px_var(--quantum-glow)]',
    medium: 'shadow-[0_0_50px_-15px_var(--quantum-glow)]',
    high: 'shadow-[0_0_70px_-20px_var(--quantum-glow)]'
  };

  return (
    <div 
      className={cn(
        // Base styles
        'relative w-full rounded-lg overflow-hidden',
        'border transition-all duration-300',
        'backdrop-blur-xl',

        // Variant styles
        variantStyles[variant],

        // Glow effect
        glowStyles[glowIntensity],

        // Border and shadow effects
        'border-quantum-primary/20 hover:border-quantum-primary/30',
        'dark:border-quantum-primary/10 dark:hover:border-quantum-primary/20',

        className
      )}
    >
      {/* Quantum field effect background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-primary/5 to-quantum-secondary/5 dark:from-quantum-primary/10 dark:to-quantum-secondary/10" />
        
        {/* Radial glow effect */}
        <div className="absolute inset-0 mix-blend-overlay">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>
        
        {/* Field lines effect */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-[repeating-linear-gradient(45deg,var(--quantum-primary),var(--quantum-primary)_1px,transparent_1px,transparent_15px)]" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}