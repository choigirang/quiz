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
      colors: {
        defaultYellow: '#F4CE14',
        defaultGreen: '#495E57',
        defaultBlack: '#45474B',
        defaultWhite: '#F5F7F8',
      },
      textColor: {
        default: '#45474B', // 기본 텍스트 색상을 defaultBlack으로 지정합니다.
      },
    },
  },
  plugins: [],
};
