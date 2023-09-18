import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,vue}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
    },
  },
  plugins: [
    typography,
    daisyui,
  ],
} satisfies Config
