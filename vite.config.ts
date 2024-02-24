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
  define: {
    // @ts-ignore: process is exist
    'process.env.USE_DEVELOPER_LAYOUT': process.env.NODE_ENV === 'development'
  },
  build: {
    target: ["chrome103"]
  }
})
