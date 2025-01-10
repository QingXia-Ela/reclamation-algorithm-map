import { UserConfig, loadEnv, mergeConfig } from 'vite'
import BasicConfig from './vite.config'
import { resolve } from 'path'
import vitePluginManifest from './src/plugins/vite/vite-plugin-manifest'

export default (args: any) => {
  const env = loadEnv(args.mode, process.cwd())

  const DesktopBuildConfig: UserConfig = {
    base: '/reclamation-algorithm-map/android/',
    build: {
      outDir: "dist/android",
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      }
    },
    plugins: [
      vitePluginManifest(env)
    ],
    define: {
      URL_BASE: '""',
      __ANDROID__: true
    }
  }
  return mergeConfig(
    BasicConfig(args),
    DesktopBuildConfig,
    false
  )
}