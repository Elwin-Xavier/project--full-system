/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          accent: '#007bff',
          text: '#212529',
        },
        dark: {
          primary: '#343a40',
          secondary: '#495057',
          accent: '#17a2b8',
          text: '#f8f9fa',
        },
      },
    },
  },
  plugins: [],
}
