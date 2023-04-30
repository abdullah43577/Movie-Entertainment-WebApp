/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
    },

    extend: {
      colors: {
        background: '#10141e',
        nav: '#171e31',
        btns: '#5a6a90',
        white: '#f3f3f3',
        iconNavLink: '#fc4747',
      },
    },
    plugins: [],
  },
};
