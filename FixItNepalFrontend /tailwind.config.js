/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
        primary: '#F97316',   
        secondary: '#0D9488',
      }
    },
  },
  plugins: [],
}

