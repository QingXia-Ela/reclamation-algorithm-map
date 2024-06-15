import { UserConfig, mergeConfig } from 'vite'
import BasicConfig from './vite.config'

export default (args: any) => {
  const DesktopBuildConfig: UserConfig = {
    base: "./",
    build: {
      outDir: "dist-desktop"
    },
    define: {
      URL_BASE: '""',
      __DESKTOP__: true
    }
  }
  return mergeConfig(
    BasicConfig(args),
    DesktopBuildConfig,
    false
  )
}