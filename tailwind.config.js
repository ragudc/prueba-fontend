/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      // Nota importante: NativeWind usa la ruta al directorio donde tengas los componentes/screen
      "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  