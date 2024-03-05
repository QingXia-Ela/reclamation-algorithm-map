import path from 'node:path'
import process from 'node:process'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { Plugin } from 'vite'

export default function vitePluginIconsReg(isBuild = process.env.NODE_ENV === 'production'): Plugin {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}