export default function saveTextFile(text: string, fileName: string) {
  const blob = new Blob([text], { type: "text/plain" })
  const a = document.createElement("a")
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 0)
}