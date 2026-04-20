import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        glass: {
          50: "rgba(255,255,255,0.05)",
          100: "rgba(255,255,255,0.08)",
          200: "rgba(255,255,255,0.12)",
          300: "rgba(255,255,255,0.18)",
        },
        brand: {
          blue: "#2563EB",
          cyan: "#06B6D4",
          purple: "#7C3AED",
          indigo: "#4F46E5",
          glow: "#60A5FA",
        },
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
        "hero-gradient":
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "blob-float": "blobFloat 8s ease-in-out infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
      keyframes: {
        blobFloat: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,15px) scale(0.97)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.37)",
        glow: "0 0 20px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.15)",
        "glow-cyan":
          "0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.15)",
        "glow-purple":
          "0 0 20px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
