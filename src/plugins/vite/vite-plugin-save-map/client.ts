/**
 * 该文件用于存储客户端方法！
 */
import { SaveMapData } from '@/three/types/data'
import { SAVE_MAP } from './constant/event'

/**
 * 保存地图
 * 
 * **该方法用于客户端**
 */
export function clientSaveMap(data: SaveMapData) {
  if (import.meta.hot) {
    import.meta.hot.send(SAVE_MAP, data)
  }
}