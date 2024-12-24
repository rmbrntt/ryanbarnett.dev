import { themeStore as newThemeStore } from "../stores/theme";
import type { Theme } from "./theme/tokens";

type Subscriber = (theme: Theme) => void;

// Create theme store (compatibility layer)
export const themeStore = {
  get: () => newThemeStore.get(),
  set: (theme: Theme) => newThemeStore.set(theme),
  subscribe: (callback: Subscriber) => {
    return newThemeStore.subscribe(callback);
  },
};

// Initialize theme (compatibility layer)
export const initializeTheme = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDark ? "dark" : "light";

  newThemeStore.set(theme as Theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

// Toggle theme (compatibility layer)
export const toggleTheme = () => {
  const current = newThemeStore.get();
  const next = current === "light" ? "dark" : "light";

  newThemeStore.set(next as Theme);
  document.documentElement.classList.toggle("dark", next === "dark");
};
