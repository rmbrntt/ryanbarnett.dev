import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { QuantumTheme } from './QuantumContainer';
import { quantumThemes } from './QuantumContainer';
import type { QuantumColor } from '../../lib/theme/tokens';

interface QuantumCardProps {
  children: ReactNode;
  theme?: QuantumTheme | QuantumColor;
  withHover?: boolean;
  className?: string;
}

export function QuantumCard({ children, theme, withHover, className }: QuantumCardProps) {
  const themeObject = typeof theme === 'string' ? quantumThemes[theme] : theme;

  return (
    <div 
      className={cn(
        "relative p-6 rounded-lg",
        "bg-white/50 dark:bg-gray-900/50",
        "hover:bg-white/70 dark:hover:bg-gray-800/70",
        "transition-colors duration-200",
        "overflow-hidden group",
        withHover && "transform hover:scale-[1.02]",
        className
      )}
    >
      {themeObject && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${themeObject.colors.primary}22 0%, ${themeObject.colors.secondary}22 100%)`
          }}
        />
      )}
      {children}
    </div>
  );
}