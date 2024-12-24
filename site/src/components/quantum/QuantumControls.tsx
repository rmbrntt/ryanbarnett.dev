import React from 'react';
import { cn } from '../../utils/cn';

interface QuantumControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function QuantumControl({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 1, 
  step = 0.01,
  className 
}: QuantumControlProps) {
  return (
    <div className={cn('relative group', className)}>
      {/* Label */}
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-quantum-primary text-sm font-mono">{label}</div>
      </div>

      {/* Control background */}
      <div className="relative h-1 bg-base-900 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-quantum-primary/30"
          style={{ width: `${(value - min) / (max - min) * 100}%` }}
        />
      </div>

      {/* Thumb */}
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={cn(
          'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
          'range-thumb:w-4 range-thumb:h-4 range-thumb:bg-quantum-primary',
          'range-thumb:border-none range-thumb:rounded-full'
        )}
      />

      {/* Thumb visible element */}
      <div 
        className="absolute top-1/2 -mt-2 w-4 h-4 pointer-events-none"
        style={{ left: `calc(${(value - min) / (max - min) * 100}% - 0.5rem)` }}
      >
        <div className="w-full h-full rounded-full bg-quantum-primary shadow-lg transform transition-transform group-hover:scale-110" />
      </div>
    </div>
  );
}