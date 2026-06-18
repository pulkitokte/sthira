/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F2F4EE",
        surface: "#FBFCF9",
        moss: {
          DEFAULT: "#3F5C4D",
          dark: "#2E4438",
        },
        sage: "#7FA993",
        clay: "#C97B5F",
        ink: "#283330",
        stone: "#6B7268",
        dew: "#6E9C9A",
      },
      fontFamily: {
        display: ["Quicksand", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 16px rgba(63, 92, 77, 0.08)",
      },
    },
  },
  plugins: [],
};
