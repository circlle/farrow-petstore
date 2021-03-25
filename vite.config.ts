import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(), 
    // use plugin for this issue: https://github.com/vitejs/vite/issues/88
    tsConfigPaths()
  ],
  build: {
    outDir: './dist/client',
  }
})
