import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/reclamation-algorithm-map/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    target: ["chrome103"]
  }
})
