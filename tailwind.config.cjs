/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    "/*.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/nubes.jpg')",
      }
    },
  },
  plugins: [],
};
