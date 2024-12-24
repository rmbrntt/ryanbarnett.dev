// Color System
export const colors = {
  quantum: {
    cyan: {
      primary: "#88d0f3",
      secondary: "#24837B",
      lab: { l: 80, a: -20, b: -30 },
      usage: "Primary interface color with high lightness for active elements"
    },
    purple: {
      primary: "#c596fc",
      secondary: "#5E409D",
      lab: { l: 70, a: 30, b: -50 },
      usage: "Secondary color for interaction states"
    },
    green: {
      primary: "#59a066",
      secondary: "#66800B",
      lab: { l: 60, a: -40, b: 20 },
      usage: "System state indicators and success states"
    },
    red: {
      primary: "#d14554",
      secondary: "#AF3029",
      lab: { l: 50, a: 50, b: 20 },
      usage: "Alert and emphasis states"
    },
    yellow: {
      primary: "#10cdb8e",
      secondary: "#AD8301",
      lab: { l: 90, a: 0, b: 40 },
      usage: "Background and ambient states"
    },
    deep: {
      primary: "#88409a",
      secondary: "#5E409D",
      lab: { l: 40, a: 40, b: -40 },
      usage: "Deep interaction states"
    }
  },
  base: {
    black: "#100F0F",
    paper: "#FFFCF0",
    950: "#1C1B1A",
    900: "#282726",
    850: "#343331",
    800: "#403E3C",
    700: "#575653",
    600: "#6F6E69",
    500: "#878580",
    300: "#B7B5AC",
    200: "#CECDC3",
    150: "#DAD8CE",
    100: "#E6E4D9",
    50: "#F2F0E5"
  }
} as const;

// Types
export type QuantumColor = keyof typeof colors.quantum;
export type Theme = 'light' | 'dark' | 'system';

// Token Generation
export function generateTokens(
  mode: Theme,
  quantumTheme: QuantumColor,
  quantumActive: boolean
) {
  const isDark =
    mode === 'dark' ||
    (mode === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const tokens: Record<string, string> = {
    '--background': isDark ? colors.base[950] : colors.base.paper,
    '--foreground': isDark ? colors.base[50] : colors.base[950],
    '--muted': isDark ? colors.base[800] : colors.base[100],
    '--muted-foreground': isDark ? colors.base[300] : colors.base[700],
    '--border': isDark ? colors.base[800] : colors.base[200],
  };

  if (quantumActive) {
    const quantum = colors.quantum[quantumTheme];
    return {
      ...tokens,
      '--quantum-primary': quantum.primary,
      '--quantum-secondary': quantum.secondary,
      '--quantum-blur': isDark ? '12px' : '8px',
      '--quantum-glow-strength': isDark ? '0.3' : '0.2',
      '--quantum-bg': `${quantum.primary}10`,
      '--quantum-border': `${quantum.primary}40`,
      '--quantum-glow': `${quantum.primary}20`,
      '--quantum-text': quantum.primary,
    };
  }

  return tokens;
}

// Effects
export const effects = {
  quantum: {
    blur: 'backdrop-blur-[var(--quantum-blur)]',
    glow: 'shadow-[0_0_30px_-10px_var(--quantum-glow)]',
    gradient: 'bg-gradient-to-br from-[var(--quantum-primary)] to-[var(--quantum-secondary)]',
  }
} as const;