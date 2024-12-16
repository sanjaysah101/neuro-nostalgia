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
        win95: {
          bg: "#c0c0c0",
          "border-light": "#ffffff",
          "border-dark": "#808080",
          "border-darker": "#404040",
          navy: "#000080",
          yellow: "#ffff00",
          cyan: "#00ffff",
          text: "#000000",
        },
        cyber: {
          primary: "#00ff00",
          secondary: "#003300",
          text: "#00ff00",
          bg: "#000000",
        },
        vaporwave: {
          primary: "#ff00ff",
          secondary: "#00ffff",
          text: "#ffffff",
        },
        grunge: {
          primary: "#8b4513",
          secondary: "#654321",
          text: "#d2691e",
        },
      },
      fontFamily: {
        win95: ['"MS Sans Serif"', '"Microsoft Sans Serif"', "Arial", "sans-serif"],
        digital: ['"Digital-7"', "monospace"],
        terminal: ["Courier", "monospace"],
      },
      boxShadow: {
        win95: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        "win95-inset": "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
        "win95-btn": "1px 1px #ffffff, -1px -1px #808080",
        "win95-btn-pressed": "inset 1px 1px #808080, inset -1px -1px #ffffff",
        "neon-green": "0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00",
        "neon-pink": "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff",
        grunge: "3px 3px 0 #000000",
      },
      backgroundImage: {
        stars: "url('/images/stars.gif')",
        "under-construction": "url('/images/under-construction.gif')",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 20s linear infinite",
        construction: "construction 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        construction: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
