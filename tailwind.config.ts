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
        steam: {
          darkest: "#0e141b",
          dark: "#171a21",
          navy: "#1b2838",
          panel: "#2a475e",
          blue: "#66c0f4",
          neon: "#1a9fff",
          green: "#a4d007",
          gold: "#ffc82c",
          danger: "#ff4d4d",
          glados: "#ff9900",
        },
      },
    },
  },
  plugins: [],
};
export default config;
