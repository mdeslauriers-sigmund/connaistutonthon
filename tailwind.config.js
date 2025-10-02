/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tuna-blue': '#1e40af',
        'tuna-light': '#3b82f6',
        'ocean-deep': '#0f172a',
        'wave-light': '#e0f2fe',
      }
    },
  },
  plugins: [],
}
