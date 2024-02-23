import { Plugin } from 'vite'


export default function vitePluginSaveMap(): Plugin {
  return {
    name: 'vite-plugin-save-map',
    apply: 'serve',

    configureServer(server) {
      // todo!:  增加开发环境下保存地图的逻辑
      server.middlewares.use(async (req, res, next) => { })
    }
  }
}
