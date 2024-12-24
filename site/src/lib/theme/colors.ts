// Core Quantum Colors
export const colors = {
  quantum: {
    cyan: {
      primary: "#88d0f3",
      secondary: "#24837B",
      lab: { l: 80, a: -20, b: -30 },
      usage: "Primary interface color with high lightness for active elements",
      variants: {
        light: {
          bg: 'rgba(136, 208, 243, 0.1)',
          border: 'rgba(136, 208, 243, 0.4)',
          glow: 'rgba(136, 208, 243, 0.2)',
        },
        dark: {
          bg: 'rgba(136, 208, 243, 0.05)',
          border: 'rgba(136, 208, 243, 0.2)',
          glow: 'rgba(136, 208, 243, 0.1)',
        }
      }
    },
    purple: {
      primary: "#c596fc",
      secondary: "#5E409D",
      lab: { l: 70, a: 30, b: -50 },
      usage: "Secondary color for interaction states",
      variants: {
        light: {
          bg: 'rgba(197, 150, 252, 0.1)',
          border: 'rgba(197, 150, 252, 0.4)',
          glow: 'rgba(197, 150, 252, 0.2)',
        },
        dark: {
          bg: 'rgba(197, 150, 252, 0.05)',
          border: 'rgba(197, 150, 252, 0.2)',
          glow: 'rgba(197, 150, 252, 0.1)',
        }
      }
    },
    green: {
      primary: "#59a066",
      secondary: "#66800B",
      lab: { l: 60, a: -40, b: 20 },
      usage: "System state indicators and success states",
      variants: {
        light: {
          bg: 'rgba(89, 160, 102, 0.1)',
          border: 'rgba(89, 160, 102, 0.4)',
          glow: 'rgba(89, 160, 102, 0.2)',
        },
        dark: {
          bg: 'rgba(89, 160, 102, 0.05)',
          border: 'rgba(89, 160, 102, 0.2)',
          glow: 'rgba(89, 160, 102, 0.1)',
        }
      }
    },
    red: {
      primary: "#d14554",
      secondary: "#AF3029",
      lab: { l: 50, a: 50, b: 20 },
      usage: "Alert and emphasis states",
      variants: {
        light: {
          bg: 'rgba(209, 69, 84, 0.1)',
          border: 'rgba(209, 69, 84, 0.4)',
          glow: 'rgba(209, 69, 84, 0.2)',
        },
        dark: {
          bg: 'rgba(209, 69, 84, 0.05)',
          border: 'rgba(209, 69, 84, 0.2)',
          glow: 'rgba(209, 69, 84, 0.1)',
        }
      }
    },
    yellow: {
      primary: "#10cdb8e",
      secondary: "#AD8301",
      lab: { l: 90, a: 0, b: 40 },
      usage: "Background and ambient states",
      variants: {
        light: {
          bg: 'rgba(16, 205, 184, 0.1)',
          border: 'rgba(16, 205, 184, 0.4)',
          glow: 'rgba(16, 205, 184, 0.2)',
        },
        dark: {
          bg: 'rgba(16, 205, 184, 0.05)',
          border: 'rgba(16, 205, 184, 0.2)',
          glow: 'rgba(16, 205, 184, 0.1)',
        }
      }
    },
    deep: {
      primary: "#88409a",
      secondary: "#5E409D",
      lab: { l: 40, a: 40, b: -40 },
      usage: "Deep interaction states",
      variants: {
        light: {
          bg: 'rgba(136, 64, 153, 0.1)',
          border: 'rgba(136, 64, 153, 0.4)',
          glow: 'rgba(136, 64, 153, 0.2)',
        },
        dark: {
          bg: 'rgba(136, 64, 153, 0.05)',
          border: 'rgba(136, 64, 153, 0.2)',
          glow: 'rgba(136, 64, 153, 0.1)',
        }
      }
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