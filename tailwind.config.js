/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1eb854',
        'primary-content': '#000000',
        secondary: '#1DB88E',
        accent: '#1DB8AB',
        neutral: '#19362D',
        'base-100': '#171212',
        'base-content': '#cbc9ca',
      },
      keyframes: {
        'text-vertical-scrolling': {
          '0%': {
            transform: 'translateY(0)',
          },
          '15%, 100%': {
            transform: 'translateY(calc(-100% + (100% / var(--units))))',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
