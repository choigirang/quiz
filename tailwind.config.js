/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", ".src/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      transitionDelay: {
        default: 1,
      },
    },
  },
  plugins: [],
};
