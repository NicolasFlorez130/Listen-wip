/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            'turquoise': '#2BB3C0',
            'offWhite': '#FAF7F1',
            'lightOrange': '#FABC74',
         }
      },
   },
   plugins: [
      require('prettier-plugin-tailwindcss'),
      ({ addBase, theme }) => {
         addBase({
            'section': { padding: '0 1.5rem' }
         })
      }
   ],
}