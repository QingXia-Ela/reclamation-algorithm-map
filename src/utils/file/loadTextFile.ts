
/**
 * 获得一个文件的文本内容
 * 
 * 会打开一个文件选择对话框
 */
export default function loadTextFile() {
  return new Promise<string>((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result as string)
        }
        reader.onerror = () => {
          reject(reader.error)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  })
}