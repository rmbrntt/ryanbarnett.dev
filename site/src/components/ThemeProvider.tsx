import React from 'react';
import { useThemeStore } from '../lib/store';
import type { Theme, QuantumColor } from '../lib/theme/tokens';
import { generateTokens } from '../lib/theme/generator';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  const { userPreference, quantum, setTheme, computeTheme } = useThemeStore();

  // Handle system theme changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initial setup
    const updateTheme = () => {
      const effectiveTheme = computeTheme();
      setTheme(effectiveTheme);
      
      // Generate and apply tokens
      const tokens = generateTokens({
        mode: effectiveTheme,
        quantumTheme: quantum.primary,
        quantumActive: quantum.active
      });

      // Apply tokens to root
      const root = document.documentElement;
      Object.entries(tokens).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Update dark mode class
      root.classList.toggle('dark', effectiveTheme === 'dark');
      root.style.colorScheme = effectiveTheme;
    };

    updateTheme();

    // Listen for system preference changes
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [userPreference, setTheme, computeTheme, quantum]);

  // Hydration handling
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="contents">
      {children}
    </div>
  );
} 