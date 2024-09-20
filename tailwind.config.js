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
        "hover-dark": "#262626",
        "accent": "#8b5cf6"
      }
    },
  },
  plugins: [],
}
