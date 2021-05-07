import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // // use plugin for this issue: https://github.com/vitejs/vite/issues/88
    // tsConfigPaths()
  ],
  build: {
    outDir: './dist/client',
  }
})
