import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Você pode precisar importar o 'path' do Node

export default defineConfig({
  plugins: [react()],
  base: "/Portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})