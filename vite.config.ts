import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsConfigPaths from 'vite-tsconfig-paths'

process.env.SERVER_HOST = process.env.SERVER_HOST || "localhost"
process.env.SERVER_PORT = process.env.SERVER_PORT || "3000"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(), 
    // use plugin for this issue: https://github.com/vitejs/vite/issues/88
    tsConfigPaths()
  ],
  define: {
    'import.meta.env.FARROW_SERVER_HOST':  process.env.SERVER_HOST,
    'import.meta.env.FARROW_SERVER_PORT': process.env.SERVER_PORT
  },
  build: {
    outDir: './dist/client',
  }
})
