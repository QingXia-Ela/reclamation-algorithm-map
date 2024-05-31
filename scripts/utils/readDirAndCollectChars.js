import fs from 'fs/promises';
import path from 'path';

export default async function readDirAndCollectChars(dir) {
  const items = await fs.readdir(dir);

  const wordSet = new Set()
  for (let item of items) {
    const fullPath = path.join(dir, item);
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      await readDirAndCollectChars(fullPath);
    } else {
      const content = (await fs.readFile(fullPath, 'utf8')).split('');

      for (let char of content) {
        wordSet.add(char);
      }
    }
  }

  return wordSet
}
