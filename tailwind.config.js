/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        '0.2' : '0.2px' 
      },
      borderRadius:{
        '40' : '40px'
      },
      backgroundColor:{
        'authButton' : '#6BA8CC'
      }
    },
  },
  plugins: [],
}

