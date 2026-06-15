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
        background: "#F5F5F6",
        surface: "#FFFFFF",
        gold: "#C9A96E",
        rose: "#E8B4B8",
        ink: "#1A1A1A",
        muted: "#6B6B6B",
        "badge-red": "#D94F4F",
        "badge-green": "#4CAF7D",
        "blush-border": "#E5E5E5",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        urdu: ["var(--font-urdu)", "serif"],
      },
      fontSize: {
        hero: ["3.5rem", { lineHeight: "1.05" }],
        h1: ["2.5rem", { lineHeight: "1.1" }],
        h2: ["2rem", { lineHeight: "1.15" }],
        h3: ["1.5rem", { lineHeight: "1.2" }],
      },
      borderRadius: {
        card: "16px",
        btn: "8px",
        pill: "50px",
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201,169,110,0.10)",
        "gold-lg": "0 8px 40px rgba(201,169,110,0.18)",
      },
      maxWidth: {
        site: "1280px",
      },
      keyframes: {
        "underline-grow": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "underline-grow": "underline-grow 0.9s ease forwards 0.3s",
        "fade-up": "fade-up 0.6s ease forwards",
        shimmer: "shimmer 1.4s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
