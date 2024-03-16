---
title: 地图数据解释
---

:::caution[注意]
目前地图数据各个字段并不会特别稳定，可能会进行不定期更新
:::


:::note[样本数据]
想要直接看一份可用的 json 数据进行学习？ <a href="" filename="dungeon_rift_template.json" download="/reclamation-algorithm-map/docs/edit/dungeon_rift_template.json">点击这里</a> 下载一份已经制作好的陌域模板！
:::

现在是对一个地图的举例：

```json
{
  "metadata": {
    "type": "main",
    "backgroundSize": 200,
    "backgroundType": "main"
  },
  "nodes": [
    {
      "preset": "normal",
      "x": -3.671575094631761,
      "y": 2.3671997320652145,
      "name": "Nodea",
      "type": "collect",
      "weather": "normal",
      "resources": [],
      "size": "small",
      "border": "square",
      "note": "",
      "mainResources": [],
      "regularResources": [],
      "nodeId": 1
    },
    {
      "preset": "normal",
      "x": -19.106237583353973,
      "y": 9.355560860959335,
      "name": "Node",
      "type": "collect",
      "weather": "normal",
      "resources": [],
      "size": "small",
      "border": "square",
      "note": "",
      "mainResources": [],
      "regularResources": [],
      "nodeId": 4
    }
  ],
  "adjancyList": {
    "1": [
      4
    ],
    "4": [
      1
    ]
  }
}
```

## 字段解释

对各个字段进行解释：

- `metadata` 地图源数据，对应 [地图工具栏](../../guides/change-bg) 的三个字段控制
- `nodes` 地图节点，为一个数组，存储所有的节点
- `adjancyList` 地图连线数据，为一个对象，`key` 为节点的 `nodeId`；`value` 为一个数组，代表连接到的节点
  - 这个连接是双向的，你想要在地图文件内手动 `添加` / `删除` 一条边时，需要对起点和终点进行同时检查与删除
  - [无向图百度百科解释](https://baike.baidu.com/item/%E6%97%A0%E5%90%91%E5%9B%BE/1680427)

## 单个节点的含义解释

等待补充...

<!-- todo!: 补充 -->