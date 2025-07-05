/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyberPink: "#ff0080",
        cyberBlue: "#00ffff",
        badgeBg: "#1a1a2e",
        neon: "#39ff14",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem", // rounded corners default 8px
      },
    },
  },
  plugins: [],
};
