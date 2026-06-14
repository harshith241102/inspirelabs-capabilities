import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the production build can be opened from any static host or sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
