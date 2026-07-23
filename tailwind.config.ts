import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        lab: {
          ink: "#0c1222",
          mist: "#e8eef4",
          steel: "#94a3b8",
          chalk: "#f4f7fa",
          signal: "#c8f542",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "score-fill": {
          from: { strokeDashoffset: "var(--score-circumference)" },
          to: { strokeDashoffset: "var(--score-offset)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "delta-slide": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "score-fill": "score-fill 1.1s ease-out forwards",
        "rise-in": "rise-in 0.7s ease-out both",
        "delta-slide": "delta-slide 0.55s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
