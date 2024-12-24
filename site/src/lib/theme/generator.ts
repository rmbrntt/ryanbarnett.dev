import type { Theme, QuantumColor } from "./tokens";
import { baseColors, quantumColors, effects, semanticTokens } from "./tokens";

interface TokenGeneratorOptions {
  mode: Theme;
  quantumTheme: QuantumColor;
  quantumActive: boolean;
}

export function generateTokens({
  mode,
  quantumTheme,
  quantumActive,
}: TokenGeneratorOptions) {
  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Base tokens
  const tokens: Record<string, string> = {
    // Base colors
    "--background": isDark ? baseColors[950] : baseColors.paper,
    "--foreground": isDark ? baseColors[50] : baseColors[950],
    "--muted": isDark ? baseColors[800] : baseColors[100],
    "--muted-foreground": isDark ? baseColors[300] : baseColors[700],
    "--border": isDark ? baseColors[800] : baseColors[200],
    "--input": isDark ? baseColors[800] : baseColors[200],
    "--ring": isDark ? baseColors[700] : baseColors[300],

    // Effects
    "--blur-strength": isDark ? effects.blur.dark : effects.blur.light,
    "--glow-strength": isDark
      ? effects.glow.dark.strength.toString()
      : effects.glow.light.strength.toString(),
    "--glow-radius": isDark
      ? effects.glow.dark.radius
      : effects.glow.light.radius,
    "--gradient-angle": effects.gradient.angles.primary,
  };

  // Add quantum tokens if active
  if (quantumActive) {
    const quantum = quantumColors[quantumTheme];
    const variant = isDark ? quantum.variants.dark : quantum.variants.light;

    return {
      ...tokens,
      // Primary quantum colors
      "--quantum-primary": quantum.primary,
      "--quantum-secondary": quantum.secondary,
      "--quantum-lab-l": quantum.lab.l.toString(),
      "--quantum-lab-a": quantum.lab.a.toString(),
      "--quantum-lab-b": quantum.lab.b.toString(),

      // Quantum variants
      "--quantum-bg": variant.bg,
      "--quantum-border": variant.border,
      "--quantum-glow": variant.glow,

      // Quantum effects
      "--quantum-blur": isDark ? effects.blur.dark : effects.blur.light,
      "--quantum-glow-strength": isDark
        ? effects.glow.dark.strength.toString()
        : effects.glow.light.strength.toString(),
      "--quantum-gradient-start": isDark
        ? effects.gradient.opacity.dark.start.toString()
        : effects.gradient.opacity.light.start.toString(),
      "--quantum-gradient-end": isDark
        ? effects.gradient.opacity.dark.end.toString()
        : effects.gradient.opacity.light.end.toString(),
    };
  }

  return tokens;
}

// Helper to get semantic color
export function getSemanticColor(
  type: keyof typeof semanticTokens,
  key: string
): QuantumColor {
  const semantic = semanticTokens[type] as Record<string, QuantumColor>;
  return semantic[key] || "cyan";
}

// Helper to generate quantum gradients
export function generateQuantumGradient(
  color: QuantumColor,
  isDark: boolean = false
) {
  const quantum = quantumColors[color];
  const opacity = isDark
    ? effects.gradient.opacity.dark
    : effects.gradient.opacity.light;

  return `linear-gradient(
    ${effects.gradient.angles.primary},
    ${quantum.primary}${Math.round(opacity.start * 100)} 0%,
    ${quantum.secondary}${Math.round(opacity.end * 100)} 100%
  )`;
}

// Helper to generate quantum shadows
export function generateQuantumShadow(
  color: QuantumColor,
  isDark: boolean = false
) {
  const quantum = quantumColors[color];
  const glow = isDark ? effects.glow.dark : effects.glow.light;

  return `0 0 ${glow.radius} ${
    quantum.variants[isDark ? "dark" : "light"].glow
  }`;
}
