import { persistentAtom } from "@nanostores/persistent";
import type { Theme, QuantumColor } from "./tokens";
import { generateTokens } from "./generator";

// Helper to get system theme
const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Helper to get effective theme
const getEffectiveTheme = (preference: Theme): "light" | "dark" => {
  if (preference === "system") {
    return getSystemTheme();
  }
  return preference;
};

interface ThemeState {
  theme: Theme;
  quantum: {
    theme: QuantumColor;
    active: boolean;
  };
}

// Theme store with persistence
export const themeStore = persistentAtom<ThemeState>(
  "theme-preference",
  {
    theme: "system",
    quantum: {
      theme: "cyan",
      active: true,
    },
  },
  {
    encode: JSON.stringify,
    decode: (str) => {
      try {
        const value = JSON.parse(str);
        return {
          theme: value.theme || "system",
          quantum: {
            theme: value.quantum?.theme || "cyan",
            active: value.quantum?.active ?? true,
          },
        };
      } catch {
        return {
          theme: "system",
          quantum: {
            theme: "cyan",
            active: true,
          },
        };
      }
    },
  }
);

// Update theme and apply changes
export function updateTheme(theme: Theme) {
  const currentState = themeStore.get();
  themeStore.set({
    ...currentState,
    theme,
  });

  applyTheme();
}

// Apply theme to document
function applyTheme() {
  const currentState = themeStore.get();
  const root = document.documentElement;
  const effectiveTheme = getEffectiveTheme(currentState.theme);
  const isDark = effectiveTheme === "dark";

  // Add transition before changing theme
  root.style.transition =
    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease";

  // Generate and apply tokens
  const tokens = generateTokens({
    mode: effectiveTheme,
    quantumTheme: currentState.quantum.theme,
    quantumActive: currentState.quantum.active,
  });

  // Apply tokens to root
  for (const [key, value] of Object.entries(tokens)) {
    if (value) root.style.setProperty(key, value);
  }

  // Update dark mode class and color scheme
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = effectiveTheme;

  // Remove transition after theme change
  setTimeout(() => {
    root.style.transition = "";
  }, 300);
}

// Update quantum theme
export function updateQuantumTheme(theme: QuantumColor) {
  const currentState = themeStore.get();
  themeStore.set({
    ...currentState,
    quantum: {
      ...currentState.quantum,
      theme,
    },
  });
  applyTheme();
}

// Toggle quantum active state
export function toggleQuantumActive() {
  const currentState = themeStore.get();
  themeStore.set({
    ...currentState,
    quantum: {
      ...currentState.quantum,
      active: !currentState.quantum.active,
    },
  });
  applyTheme();
}

// Initialize theme if in browser
if (typeof window !== "undefined") {
  // Watch for system theme changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    const currentState = themeStore.get();
    if (currentState.theme === "system") {
      applyTheme();
    }
  });

  // Watch for view transitions
  document.addEventListener("astro:after-swap", () => {
    applyTheme();
  });

  // Set initial theme
  applyTheme();
}
