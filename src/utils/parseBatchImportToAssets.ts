/**
 * 将批量引入的图片转换为资源关键字 -> 值的形式
 * 
 * @param obj 通过 vite 批量引入的图片
 * 
 * @example
 * ```ts
 * // 假设存在 foo_bar.png
 * const obj = import.meta.glob<any>("../foo/bar/*.png", {
 *   eager: true
 * })
 * 
 * // 资源过小会被内联，否则返回静态资源路径
 * parseBatchImportToAssets(obj) // { FOO_BAR: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA" }
 * ```
 */
export default function parseBatchImportToAssets(obj: Record<string, any>) {
  const data: Record<string, string> = {}

  Object.entries(obj).forEach(([k, v]) => {
    data[k.split("/").pop()!.replace(".png", "").toUpperCase()] = v.default
  })

  return data
}