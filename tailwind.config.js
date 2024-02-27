/** @type {import('tailwindcss').Config} */
module.exports = {
    daisyui: {
        themes: ['nord']
    },
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui"), require('@tailwindcss/typography')],
    
  }