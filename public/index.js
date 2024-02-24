import fs from 'fs'
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

// add id for node

data.nodes.forEach((node, index) => {
  node.id = index + 1
})

fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf-8')