export function seralizeCurrentTime() {
  return seralizeTime(new Date())
}

/**
 * 序列化时间
 * 
 * 格式：年-月-日 时:分:秒
 * 
 * @param time Current time
 */
export function seralizeTime(time: Date) {
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}