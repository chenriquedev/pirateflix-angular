/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"]
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
}
