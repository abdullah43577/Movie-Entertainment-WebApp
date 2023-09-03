/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
      '2xl': '1440px',
    },

    extend: {
      colors: {
        background: '#10141e',
        nav: '#171e31',
        btns: '#5a6a90',
        white: '#f3f3f3',
        iconNavLink: '#fc4747',
        cardGenres: '#0e7490',
      },
    },
    plugins: [],
  },
};
