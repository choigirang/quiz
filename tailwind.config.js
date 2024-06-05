/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '.src/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      transitionDelay: {
        default: 1,
      },
      gridTemplateColumns: {
        stackCategory: 'repeat(5, auto)',
      },
      transitionProperty: {
        default: 'all',
      },
      transitionTimingFunction: {
        default: 'ease-in-out',
      },
      transitionDelay: {
        default: '1s',
      },
    },
  },
  plugins: [],
};
