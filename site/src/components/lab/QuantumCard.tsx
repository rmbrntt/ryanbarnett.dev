import type { ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../stores/theme';
import type { QuantumTheme } from '../markdoc/QuantumContainer';

interface QuantumCardProps {
  children: ReactNode;
  theme?: string | QuantumTheme;
  variant?: 'default' | 'solid' | 'ghost';
}

export function QuantumCard({ 
  children, 
  theme = 'cyan',
  variant = 'default'
}: QuantumCardProps) {
  const currentTheme = useStore(themeStore);
  const activeTheme = typeof theme === 'string' ? theme : 'cyan';

  return (
    <div className={`
      quantum-card
      quantum-${activeTheme}
      ${variant !== 'default' ? `quantum-card-${variant}` : ''}
    `}>
      {children}
    </div>
  );
} 