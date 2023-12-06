/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',   // Your primary color
        secondary: '#e74c3c', // Your secondary color
        accent: '#2ecc71',    // Your accent color
      },
    },
    
  },
  plugins: [require("daisyui")],
}