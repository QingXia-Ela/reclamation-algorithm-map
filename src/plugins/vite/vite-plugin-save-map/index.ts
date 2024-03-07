import { Plugin } from 'vite'
import { SAVE_MAP } from './constant/event'
import * as fs from 'fs'
import * as path from 'path'

const __dirname = process.cwd()

export default function vitePluginSaveMap(): Plugin {
  return {
    name: 'vite-plugin-save-map',
    apply: 'serve',


    configureServer(server) {
      // todo!:  增加开发环境下保存地图的逻辑
      server.hot.on(SAVE_MAP, (data) => {
        const mapType = JSON.parse(data).type || 'main'
        // save to src/assets/json
        fs.writeFileSync(path.join(__dirname, `public/map_${mapType}.json`), data)
      })
    }
  }
}
