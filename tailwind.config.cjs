/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#2B7A78",
          terracotta: "#C84B31",
          cream: "#F4EAE0",
          beige: "#F7F1EB",
          brown: "#5E4630"
        }
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        handwritten: ["'Shadows Into Light'", "cursive"]
      },
      boxShadow: {
        soft: "0 20px 40px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
