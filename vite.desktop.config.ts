import { UserConfig, mergeConfig } from 'vite'
import BasicConfig from './vite.config'
import { resolve } from 'path'

export default (args: any) => {
  const DesktopBuildConfig: UserConfig = {
    // provide for android locate path. DO NOT MODIFY
    base: './',
    build: {
      outDir: "dist/desktop",
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      }
    },
    define: {
      URL_BASE: '""',
      __DESKTOP__: true
    },

  }
  return mergeConfig(
    BasicConfig(args),
    DesktopBuildConfig,
    false
  )
}