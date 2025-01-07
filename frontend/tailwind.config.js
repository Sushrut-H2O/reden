/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reden-teal': '#16e7cf',
        'reden-blue': '#004d7f',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}