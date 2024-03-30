import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import theme from 'daisyui/src/theming/themes'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        rubik: ['Rubik', '"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
    daisyui,
  ],
  daisyui: {
    themes: [
      'lemonade',
      'forest',
      {
        forest: {
          ...theme['[data-theme=forest]'],
          '--b1': '0 0 8%',
        },
      },
    ],
    logs: false,
  },
} satisfies Config
