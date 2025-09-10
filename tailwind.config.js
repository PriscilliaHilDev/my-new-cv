/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // ou 'media' si tu veux basé sur le système
  content: [
    "./*.html",       // Tous les fichiers HTML à la racine
    "./src/js/**/*.js" // Tous les fichiers JavaScript dans le dossier src/js
  ],  
    theme: {
    extend: {},
  },
  plugins: [],
}

