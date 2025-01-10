/// <reference types="vite/client" />

declare const RIFT_MAPS_DATA: Array<{
  name: string,
  filename: string
}>

declare module "*.glsl" {
  const value: string
  export default value
}

declare const __DEV__: boolean
declare const __DESKTOP__: boolean
declare const __ANDROID__: boolean

declare const GITEE_MODE: boolean

declare const URL_BASE: string