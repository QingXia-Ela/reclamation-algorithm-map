import fs from 'node:fs'
import type { Plugin } from 'vite'
import fb from 'fast-glob'
import { resolve } from 'node:path'
import dayjs from 'dayjs'
import archiver from 'archiver'

function getDirs(base: string) {
  return [
    `${base}/**/*.*`,
    `!${base}/archive*.zip`
  ]
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function vitePluginManifest(env: Record<string, any>): Plugin {
  const { VITE_BUILD_ARCHIVE } = env
  let outDir: string
  return {
    name: 'vite-plugin-manifest',
    apply: 'build',
    enforce: 'post',
    async configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir
    },
    async closeBundle() {
      // zip create
      if (['zip', 'tar'].includes(VITE_BUILD_ARCHIVE)) {
        await sleep(1000)
        const archive = archiver(VITE_BUILD_ARCHIVE, {
          ...(VITE_BUILD_ARCHIVE === 'zip' && { zlib: { level: 9 } }),
          ...(VITE_BUILD_ARCHIVE === 'tar' && { gzip: true, gzipOptions: { level: 9 } }),
        })
        const output = fs.createWriteStream(`${outDir}/archive.${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.${VITE_BUILD_ARCHIVE === 'zip' ? 'zip' : 'tar.gz'}`)
        archive.pipe(output)
        archive.directory(outDir, false)
        await archive.finalize()
      }

      const resolvedDir = outDir.replace(/\\/g, '/')
      const archive = (await fb(
        [`${resolvedDir}/archive*.zip`]
      ))[0].replace("dist/", "")

      const files = (await fb(
        getDirs(resolvedDir)
      )).map((item) => item.replace("dist/", ""))

      fs.writeFileSync(`${outDir}/manifest.json`, JSON.stringify({ archive, files }))
    },
  }
}
