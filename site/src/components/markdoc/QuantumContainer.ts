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
    background?: string;
    foreground?: string;
  };
}

export const quantumThemes = {
  cyan: {
    colors: {
      primary: "#88d0f3",
      secondary: "#24837B",
      bg: "rgba(136, 208, 243, 0.1)",
      border: "rgba(136, 208, 243, 0.4)",
      glow: "rgba(136, 208, 243, 0.2)",
      text: "#88d0f3",
      accent: "#24837B",
      muted: "rgba(136, 208, 243, 0.6)",
      background: "rgba(136, 208, 243, 0.05)",
      foreground: "#88d0f3",
    },
  },
  purple: {
    colors: {
      primary: "#c596fc",
      secondary: "#5E409D",
      bg: "rgba(197, 150, 252, 0.1)",
      border: "rgba(197, 150, 252, 0.4)",
      glow: "rgba(197, 150, 252, 0.2)",
      text: "#c596fc",
      accent: "#5E409D",
      muted: "rgba(197, 150, 252, 0.6)",
      background: "rgba(197, 150, 252, 0.05)",
      foreground: "#c596fc",
    },
  },
  green: {
    colors: {
      primary: "#59a066",
      secondary: "#66800B",
      bg: "rgba(89, 160, 102, 0.1)",
      border: "rgba(89, 160, 102, 0.4)",
      glow: "rgba(89, 160, 102, 0.2)",
      text: "#59a066",
      accent: "#66800B",
      muted: "rgba(89, 160, 102, 0.6)",
      background: "rgba(89, 160, 102, 0.05)",
      foreground: "#59a066",
    },
  },
  red: {
    colors: {
      primary: "#d14554",
      secondary: "#AF3029",
      bg: "rgba(209, 69, 84, 0.1)",
      border: "rgba(209, 69, 84, 0.4)",
      glow: "rgba(209, 69, 84, 0.2)",
      text: "#d14554",
      accent: "#AF3029",
      muted: "rgba(209, 69, 84, 0.6)",
      background: "rgba(209, 69, 84, 0.05)",
      foreground: "#d14554",
    },
  },
  yellow: {
    colors: {
      primary: "#10cdb8e",
      secondary: "#AD8301",
      bg: "rgba(16, 205, 184, 0.1)",
      border: "rgba(16, 205, 184, 0.4)",
      glow: "rgba(16, 205, 184, 0.2)",
      text: "#10cdb8e",
      accent: "#AD8301",
      muted: "rgba(16, 205, 184, 0.6)",
      background: "rgba(16, 205, 184, 0.05)",
      foreground: "#10cdb8e",
    },
  },
  deep: {
    colors: {
      primary: "#88409a",
      secondary: "#5E409D",
      bg: "rgba(136, 64, 153, 0.1)",
      border: "rgba(136, 64, 153, 0.4)",
      glow: "rgba(136, 64, 153, 0.2)",
      text: "#88409a",
      accent: "#5E409D",
      muted: "rgba(136, 64, 153, 0.6)",
      background: "rgba(136, 64, 153, 0.05)",
      foreground: "#88409a",
    },
  },
} as const;
