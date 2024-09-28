/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": "#f5f5f5",
        "dark": "#171717",
        "darker": "#262626",
        "semidarker": "#303030",
        "outline": "#404040",
        "accent": "#8b5cf6",
        "warn": "#dc2626",
      }
    },
  },
  plugins: [],
}
