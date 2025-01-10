import fs from 'node:fs'
import dayjs from 'dayjs'
import archiver from 'archiver'
import type { Plugin } from 'vite'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function vitePluginArchiver(env: Record<string, any>): Plugin {
  const { VITE_BUILD_ARCHIVE } = env
  let outDir: string
  return {
    name: 'vite-plugin-archiver',
    apply: 'build',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir
    },
    async closeBundle() {
      if (['zip', 'tar'].includes(VITE_BUILD_ARCHIVE)) {
        await sleep(1000)
        const archive = archiver(VITE_BUILD_ARCHIVE, {
          ...(VITE_BUILD_ARCHIVE === 'zip' && { zlib: { level: 9 } }),
          ...(VITE_BUILD_ARCHIVE === 'tar' && { gzip: true, gzipOptions: { level: 9 } }),
        })
        const output = fs.createWriteStream(`${outDir}/archive.${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.${VITE_BUILD_ARCHIVE === 'zip' ? 'zip' : 'tar.gz'}`)
        archive.pipe(output)
        archive.directory(outDir, false)
        archive.finalize()
      }
    },
  }
}
