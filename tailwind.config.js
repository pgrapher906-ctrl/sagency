/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // This tells Tailwind to scan all your HTML files in this folder
  theme: {
    extend: {
      colors: {
        'brand-orange': '#ed8a19',
        'brand-dark': '#2a3b4c'
      }
    },
  },
  plugins: [],
}
