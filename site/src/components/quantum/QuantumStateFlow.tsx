import React from 'react';
import { cn } from '../../utils/cn';
import { type QuantumTheme, quantumThemes } from '../markdoc/QuantumContainer';

interface QuantumState {
  name: string;
  theme?: QuantumTheme;
  description?: string;
}

interface QuantumStateFlowProps {
  states: QuantumState[];
  className?: string;
  columns?: 2 | 3 | 4;
  withGradient?: boolean;
}

export function QuantumStateFlow({
  states,
  className,
  columns = 4,
  withGradient = false
}: QuantumStateFlowProps) {
  return (
    <div className={cn(
      'grid gap-4',
      {
        'grid-cols-2': columns === 2,
        'grid-cols-3': columns === 3,
        'grid-cols-4': columns === 4
      },
      className
    )}>
      {states.map((state, index) => {
        const currentTheme = state.theme || quantumThemes.cyan;
        const previousTheme = index > 0 ? (states[index-1].theme || quantumThemes.cyan) : currentTheme;
        
        return (
          <div
            key={state.name}
            className={cn(
              'relative p-4 rounded-lg',
              'bg-white/5 dark:bg-gray-900/5',
              'border border-transparent',
              'backdrop-blur-sm transition-all duration-300',
              'hover:bg-white/10 dark:hover:bg-gray-900/10',
              'group'
            )}
            style={{
              borderColor: currentTheme.colors.border
            }}
          >
            <div className="space-y-2">
              <div 
                className="font-mono"
                style={{ color: currentTheme.colors.text }}
              >
                {state.name}
              </div>
              {state.description && (
                <div 
                  className="text-sm opacity-80"
                  style={{ color: currentTheme.colors.text }}
                >
                  {state.description}
                </div>
              )}
            </div>
            {withGradient && (
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-3xl"
                style={{
                  background: `linear-gradient(to right, ${previousTheme.colors.primary}22, ${currentTheme.colors.primary}22)`
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}