import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Sets the base path to relative ('./') instead of absolute ('/').
  // This allows the app to work on Vercel (root) AND GitHub Pages (subdirectory).
  base: './',
  server: {
    host: true,
    port: 3000
  }
})