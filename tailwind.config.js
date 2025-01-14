/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: '270ms'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      }
    },
  },
  plugins: [],
}

