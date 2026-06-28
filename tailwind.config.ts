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
        background: "#FFFFFF",
        surface: "#FFFFFF",
        // "gold" is repurposed as the primary near-black accent so the whole
        // site reads monochrome (Maria.B style) without renaming every class.
        gold: "#1A1A1A",
        rose: "#9B1C2E",
        ink: "#1A1A1A",
        muted: "#767676",
        "badge-red": "#C0392B",
        "badge-green": "#1A1A1A",
        "blush-border": "#E7E3DE",
        // Warm editorial accents for a premium womenswear feel.
        cream: "#F8F5F1",
        accent: "#8E2B3F",
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
        card: "2px",
        btn: "2px",
        pill: "50px",
      },
      boxShadow: {
        gold: "0 1px 3px rgba(0,0,0,0.04)",
        "gold-lg": "0 8px 30px rgba(0,0,0,0.08)",
      },
      maxWidth: {
        site: "1600px",
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
        reveal: "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 1.4s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
