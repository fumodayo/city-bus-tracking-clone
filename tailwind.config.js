/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#f1faf6",
        mainColor: "#3597e4",
        codeLK01: "#ff1500",
        codeR15: "#7d0606",
        codeR16: "#071a82",
        codeR117A: "#ff1956",
        codeR4A: "#ed9970",
        codeR6A: "#06d901",
        codeTMF: "#165f78",
      },
    },
  },
  plugins: [],
};
