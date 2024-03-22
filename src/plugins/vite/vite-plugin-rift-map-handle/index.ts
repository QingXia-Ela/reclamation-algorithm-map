import { Plugin } from 'vite'
import fs from 'fs'

export default function vitePluginRiftMapHandle(): Plugin {
  return {
    name: 'vite-plugin-rift-map-handle',
    enforce: 'pre',
    config: () => {
      // read public/maps/rift/百变陌域模板*.json
      const riftMaps = fs.readdirSync('public/maps/rift/').filter(file => file.endsWith('.json') && file.startsWith('百变陌域模板')).map(file => {
        const {
          metadata: {
            name
          }
        } = JSON.parse(fs.readFileSync(`public/maps/rift/${file}`, 'utf-8'))
        return {
          name,
          filename: file.replace('.json', '')
        }
      })

      return {
        define: {
          RIFT_MAPS_DATA: JSON.stringify(riftMaps)
        }
      }
    }
  }
}
