import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import vitePluginSaveMap from './src/plugins/vite/vite-plugin-save-map'
import vitePluginIconsReg from './src/plugins/vite/vite-plugin-icons-reg'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ command, mode }: any) => {
  return defineConfig({
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vitePluginSaveMap(),
      vitePluginIconsReg(),
      Markdown()
    ],
    base: '/reclamation-algorithm-map/',
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env.USE_DEVELOPER_LAYOUT': process.env.NODE_ENV === 'development',
      '__DEV__': process.env.NODE_ENV === 'development'
    },
    build: {
      target: ["chrome103"],
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          edit: resolve(__dirname, './edit/index.html'),
        }
      },
    }
  })
}
