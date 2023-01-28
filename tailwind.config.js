/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'border': 'linear-gradient(90deg, rgba(255, 255, 255) 100%, rgba(106, 106, 106) 0)',
        'custom-green': '#1DB954',
       
      },
    },
  },
  plugins: [],
}