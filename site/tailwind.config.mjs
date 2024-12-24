/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        quantum: {
          primary: "hsl(var(--quantum-primary))",
          secondary: "hsl(var(--quantum-secondary))",
        },
        flexoki: {
          red: "hsl(var(--red))",
          "red-light": "hsl(var(--red-light))",
          orange: "hsl(var(--orange))",
          "orange-light": "hsl(var(--orange-light))",
          yellow: "hsl(var(--yellow))",
          "yellow-light": "hsl(var(--yellow-light))",
          green: "hsl(var(--green))",
          "green-light": "hsl(var(--green-light))",
          cyan: "hsl(var(--cyan))",
          "cyan-light": "hsl(var(--cyan-light))",
          blue: "hsl(var(--blue))",
          "blue-light": "hsl(var(--blue-light))",
          purple: "hsl(var(--purple))",
          "purple-light": "hsl(var(--purple-light))",
          magenta: "hsl(var(--magenta))",
          "magenta-light": "hsl(var(--magenta-light))",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--foreground))",
            "--tw-prose-code": "hsl(var(--cyan))",
            "--tw-prose-quotes": "hsl(var(--muted-foreground))",
          },
        },
      },
    },
  },
  plugins: [],
};
