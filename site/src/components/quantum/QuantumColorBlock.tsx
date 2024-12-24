import React from 'react';
import { cn } from '../../utils/cn';
import { type QuantumTheme, quantumThemes } from '../markdoc/QuantumContainer';

interface QuantumColorBlockProps {
  name: string;
  lab: { l: number; a: number; b: number };
  hex: string;
  theme?: QuantumTheme;
  className?: string;
  children?: React.ReactNode;
}

export function QuantumColorBlock({
  name,
  lab,
  hex,
  theme = quantumThemes.cyan,
  className,
  children
}: QuantumColorBlockProps) {
  // Map color names to quantum classes
  const colorMap: Record<string, string> = {
    'Quantum Cyan': 'quantum-cyan',
    'Astral Purple': 'quantum-purple',
    'Matrix Green': 'quantum-green',
    'Neural Red': 'quantum-red',
    'Void Yellow': 'quantum-yellow',
    'Deep Mind': 'quantum-deep'
  };

  const quantumClass = colorMap[name] || 'quantum-cyan';

  return (
    <div
      className={cn(
        'relative p-6 rounded-lg',
        'backdrop-blur-sm transition-all duration-500',
        'group overflow-hidden cursor-pointer',
        'hover:scale-[1.02] hover:-translate-y-0.5',
        quantumClass,
        className
      )}
    >
      {/* Quantum field effect */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative space-y-3 z-10">
        <div className="font-mono text-lg font-medium tracking-tight">
          {name}
        </div>
        <div className="font-mono text-sm opacity-90">
          L:{lab.l} a:{lab.a} b:{lab.b}
          <br />
          {hex}
        </div>
        {children && (
          <div className="mt-4 text-sm opacity-80 group-hover:opacity-100 transition-opacity">
            {children}
          </div>
        )}
      </div>

      {/* Hover effects */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${hex}22 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${theme.colors.secondary}22 0%, transparent 70%)`
        }}
      />
    </div>
  );
}