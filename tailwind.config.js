/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",       // Tous les fichiers HTML à la racine
    "./src/js/**/*.js" // Tous les fichiers JavaScript dans le dossier src/js
  ],  
    theme: {
    extend: {},
  },
  plugins: [],
}

