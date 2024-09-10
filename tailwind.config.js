/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#2a2a72', // Dark Blue
          secondary: '#5c2a72', // Purple
          background: '#121212', // Dark Background
          text: '#ffffff', // White Text
        },
        light: {
          primary: '#00aaff', // Ocean Blue
          secondary: '#cce7ff', // Light Blue
          background: '#ffffff', // Light Background
          text: '#000000', // Black Text
        }
      },
    },
  },
  plugins: [],
}
