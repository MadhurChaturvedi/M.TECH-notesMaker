/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e9edff",
          200: "#cfd8ff",
          300: "#a7b6ff",
          400: "#7a8aff",
          500: "#545cff",
          600: "#3d41db",
          700: "#2f31a8",
          800: "#26297f",
          900: "#1f2263"
        }
      }
    },
  },
  plugins: [],
}