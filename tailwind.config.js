/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f5ff',
          100: '#f0ebff',
          200: '#e0d7ff',
          300: '#d0c3ff',
          400: '#b39eff',
          500: '#9570ff',
          600: '#7d42ff',
          700: '#6d2fe6',
          800: '#5a24cc',
          900: '#4a1b99',
        },
      },
    },
  },
  plugins: [],
}
