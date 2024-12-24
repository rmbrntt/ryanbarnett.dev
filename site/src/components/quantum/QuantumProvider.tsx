import React from 'react';
import { useThemeStore } from '../../lib/store';
import { type QuantumTheme, quantumThemes } from './QuantumContext';

interface QuantumProviderProps {
  children: React.ReactNode;
  defaultTheme?: QuantumTheme;
}

export function QuantumProvider({ 
  children,
  defaultTheme = quantumThemes.cyan 
}: QuantumProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState(defaultTheme);
  const mode = useThemeStore((state) => state.theme);

  // Only run after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // Apply quantum theme CSS variables when theme changes
    if (!mounted) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--quantum-${key}`, value);
    });

    // Adjust quantum theme based on dark/light mode
    if (mode === 'dark') {
      root.style.setProperty('--quantum-blur', '12px');
      root.style.setProperty('--quantum-glow-strength', '0.3');
    } else {
      root.style.setProperty('--quantum-blur', '8px');
      root.style.setProperty('--quantum-glow-strength', '0.2');
    }
  }, [theme, mode, mounted]);

  // Prevent flash during SSR/hydration
  if (!mounted) {
    return <div className="contents">{children}</div>;
  }

  return (
    <div className="contents">
      {children}
    </div>
  );
}