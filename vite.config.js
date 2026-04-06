import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Hindari CORS di dev: fetch ke `/hra/result/...` → HR AI Analyzer
      '/hra': {
        target: 'https://hrisaianalyzer-production.up.railway.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/hra/, ''),
      },
    },
  },
})
