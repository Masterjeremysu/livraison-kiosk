/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        clair: {
          fond: "#f9f9fb",
          accent: "#eceff4",
        },
      },
    },
  },
  plugins: [],
}
