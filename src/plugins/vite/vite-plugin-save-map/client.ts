/**
 * 该文件用于存储客户端方法！
 */
import { SAVE_MAP } from './constant/event'

/**
 * 保存地图
 * 
 * **该方法用于客户端**
 * 
 * 用户界面下不会保存到本地
 */
export function clientSaveMap(data: string) {
  if (import.meta.hot) {
    // 用户编辑界面，但是开发环境
    // 开发环境直接在主界面编辑即可
    if (process.env.USER_EDIT_MODE) {
      return
    }
    import.meta.hot.send(SAVE_MAP, data)
  }
}