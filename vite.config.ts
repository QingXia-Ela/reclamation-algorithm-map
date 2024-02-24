import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginSaveMap from './src/plugins/vite/vite-plugin-save-map'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginSaveMap()],
  base: '/reclamation-algorithm-map/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    // @ts-ignore: process is exist
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.USE_DEVELOPER_LAYOUT': process.env.NODE_ENV === 'development'
  },
  build: {
    target: ["chrome103"]
  }
})
