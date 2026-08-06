/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'font-aboreto' will map to your Next.js Google font
        'aboreto': ['var(--font-aboreto)', 'sans-serif'],
        'arapey': ['var(--font-arapey)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}