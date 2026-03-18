import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#702ae1",
        "primary-dim": "#6411d5",
        "primary-container": "#b28cff",
        "primary-fixed": "#b28cff",
        "primary-fixed-dim": "#a67aff",
        "on-primary": "#f8f0ff",
        "on-primary-container": "#2e006c",
        "on-primary-fixed": "#000000",
        "on-primary-fixed-variant": "#390083",
        "inverse-primary": "#a476ff",

        secondary: "#0057bd",
        "secondary-dim": "#004ca6",
        "secondary-container": "#bfd1ff",
        "secondary-fixed": "#bfd1ff",
        "secondary-fixed-dim": "#a9c4ff",
        "on-secondary": "#f0f2ff",
        "on-secondary-container": "#004496",
        "on-secondary-fixed": "#003271",
        "on-secondary-fixed-variant": "#004da8",

        tertiary: "#b80438",
        "tertiary-dim": "#a20030",
        "tertiary-container": "#ff9099",
        "tertiary-fixed": "#ff9099",
        "tertiary-fixed-dim": "#ff7986",
        "on-tertiary": "#ffefef",
        "on-tertiary-container": "#68001b",
        "on-tertiary-fixed": "#39000b",
        "on-tertiary-fixed-variant": "#780021",

        background: "#fef3ff",
        surface: "#fef3ff",
        "surface-bright": "#fef3ff",
        "surface-dim": "#e8c9ff",
        "surface-variant": "#edd3ff",
        "surface-tint": "#702ae1",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#faecff",
        "surface-container": "#f5e2ff",
        "surface-container-high": "#f1daff",
        "surface-container-highest": "#edd3ff",
        "inverse-surface": "#180429",

        "on-background": "#3a264b",
        "on-surface": "#3a264b",
        "on-surface-variant": "#69537b",
        "inverse-on-surface": "#ad93c0",

        outline: "#856e98",
        "outline-variant": "#bda3d1",

        error: "#b41340",
        "error-dim": "#a70138",
        "error-container": "#f74b6d",
        "on-error": "#ffefef",
        "on-error-container": "#510017",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 12px 24px -6px rgba(112, 42, 225, 0.06)",
        glow: "0 12px 24px -6px rgba(112, 42, 225, 0.15)",
        "glow-lg": "0 20px 40px -10px rgba(112, 42, 225, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
