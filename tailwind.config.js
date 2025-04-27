// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Nota: A estratégia 'class' é crucial para o modo escuro com NativeWind v4+
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Inclui tudo dentro da pasta app
    "./components/**/*.{js,jsx,ts,tsx}" // Se você criar uma pasta de componentes
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {}
    },
  },
  plugins: [],
}