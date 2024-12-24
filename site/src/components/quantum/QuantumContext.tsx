import React from 'react';
import { useThemeStore } from '../../lib/store';

type ReactNode = React.ReactNode;

export interface QuantumTheme {
  colors: {
    primary: string;
    secondary: string;
    bg: string;
    border: string;
    glow: string;
    text: string;
    accent?: string;
    muted?: string;
  };
  icon?: string;
}

interface QuantumContextType {
  theme: QuantumTheme;
  setTheme: (theme: QuantumTheme) => void;
}

const QuantumContext = React.createContext<QuantumContextType | undefined>(undefined);

export const quantumThemes = {
  cyan: {
    colors: {
      primary: "var(--quantum-cyan)",
      secondary: "var(--quantum-cyan-secondary)",
      bg: "var(--quantum-cyan-bg)",
      border: "var(--quantum-cyan-border)",
      glow: "var(--quantum-cyan-glow)",
      text: "var(--quantum-cyan-text)",
    },
    icon: '⚡'
  },
  purple: {
    colors: {
      primary: "var(--quantum-purple)",
      secondary: "var(--quantum-purple-secondary)",
      bg: "var(--quantum-purple-bg)",
      border: "var(--quantum-purple-border)",
      glow: "var(--quantum-purple-glow)",
      text: "var(--quantum-purple-text)",
    },
    icon: '◐'
  },
  green: {
    colors: {
      primary: "var(--quantum-green)",
      secondary: "var(--quantum-green-secondary)",
      bg: "var(--quantum-green-bg)",
      border: "var(--quantum-green-border)",
      glow: "var(--quantum-green-glow)",
      text: "var(--quantum-green-text)",
    },
    icon: '∿'
  }
} as const;

export const useQuantum = () => {
  const context = React.useContext(QuantumContext);
  if (context === undefined) {
    throw new Error('useQuantum must be used within a QuantumProvider');
  }
  return context;
};

interface QuantumProviderProps {
  children: ReactNode;
  defaultTheme?: QuantumTheme;
}

export const QuantumProvider: React.FC<QuantumProviderProps> = ({ 
  children,
  defaultTheme = quantumThemes.cyan 
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState(defaultTheme);
  const { theme: mode } = useThemeStore();

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
    <QuantumContext.Provider value={{ theme, setTheme }}>
      <div className="contents">{children}</div>
    </QuantumContext.Provider>
  );
};