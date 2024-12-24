import { persistentAtom } from "@nanostores/persistent";

export type Theme = "light" | "dark" | "system";

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

export const themeStore = persistentAtom<Theme>("theme-preference", "system", {
  encode: JSON.stringify,
  decode: (str) => {
    try {
      const value = JSON.parse(str);
      if (value === "light" || value === "dark" || value === "system") {
        return value;
      }
      return "system";
    } catch {
      return "system";
    }
  },
});

export function updateTheme(theme: Theme) {
  themeStore.set(theme);

  const root = document.documentElement;
  const effectiveTheme = getEffectiveTheme(theme);

  if (effectiveTheme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
}

// Initialize theme if in browser
if (typeof window !== "undefined") {
  // Watch for system theme changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    const currentTheme = themeStore.get();
    if (currentTheme === "system") {
      updateTheme("system");
    }
  });

  // Set initial theme
  const savedTheme = themeStore.get();
  if (savedTheme) {
    updateTheme(savedTheme);
  }
}
