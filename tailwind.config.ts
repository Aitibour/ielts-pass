import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#046bd2",
          dark: "#045cb4",
          light: "#EFF6FF",
        },
        accent: {
          DEFAULT: "#C8102F",
          dark: "#8E0B21",
          light: "#FEF2F2",
        },
        navy: {
          DEFAULT: "#012269",
          deep: "#011F65",
          light: "#001a4d",
        },
        ielts: {
          green: "#0A8C51",
          reading: "#046bd2",
          listening: "#7C3AED",
          writing: "#C8102F",
          speaking: "#0A8C51",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        "card-lg":
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        "card-hover":
          "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
