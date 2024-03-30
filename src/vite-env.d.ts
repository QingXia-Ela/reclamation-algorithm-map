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