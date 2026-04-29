// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})