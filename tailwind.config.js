/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBF8F2',
        surface: '#FFFFFF',
        border: '#ECE6D8',
        moss: {
          DEFAULT: '#5C7F6A',
          dark: '#46604F',
        },
        sage: '#8FB39C',
        clay: '#D9A878',
        ink: '#33352F',
        stone: '#777A70',
        dew: '#8FB8CC',
      },
      fontFamily: {
        display: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -14px rgba(51, 53, 47, 0.16)',
        'soft-top': '0 -8px 24px -14px rgba(51, 53, 47, 0.14)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}