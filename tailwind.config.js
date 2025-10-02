/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'molle': ['Molle', 'cursive'],
      },
      colors: {
        // Thème Océan (Thon)
        'tuna-blue': '#1e40af',
        'tuna-light': '#3b82f6',
        'ocean-deep': '#0f172a',
        'wave-light': '#e0f2fe',

        // Thème Abeille (Nouveau)
        'bee-yellow': '#fbbf24',
        'bee-gold': '#f59e0b',
        'honey-dark': '#92400e',
        'honey-light': '#fef3c7',
        'bee-black': '#1f2937',
        'pollen-light': '#fef7cd',
      }
    },
  },
  plugins: [],
}
