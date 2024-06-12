import { Plugin } from 'vite'
import fs from 'fs/promises'
// @ts-expect-error: no declaration file
import readDirAndCollectWords from '../../../../scripts/utils/readDirAndCollectChars'
import SHSCN from '../../../assets/three/fonts/思源黑体R_Regular.json'


export default function vitePluginMapFontBundle(): Plugin {
  let font_dir = './dist/assets/font/map_font.json'
  return {
    name: 'vite-plugin-map-font-bundle',
    enforce: 'pre',
    apply: 'build',
    configResolved(cfg) {
      font_dir = `${cfg.build.outDir}/assets/font`
    },
    async closeBundle() {
      const set = await readDirAndCollectWords('./src/constants')
      const newFontGlyphs = {}
      for (const char of set) {
        newFontGlyphs[char] = SHSCN.glyphs[char]
      }

      SHSCN.glyphs = newFontGlyphs

      await fs.mkdir(font_dir, { recursive: true })
      await fs.writeFile(`${font_dir}/map_font.json`, JSON.stringify(SHSCN, null))
    }
  }
}
