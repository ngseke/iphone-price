import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as child from 'child_process'

const commitHash = child
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
  },
  base: './',
  define: {
    COMMIT_HASH: JSON.stringify(commitHash),
    BUILT_AT: +new Date(),
  },
})
