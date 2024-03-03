<script setup lang="ts">
import { useToolbar } from '@/store/dev/toolbar';
import { computed } from 'vue';
import { ElDrawer } from 'element-plus';
import findShortestRoad from '@/three/utils/algorithm/findShortestRoad';
import core from '@/three';
import Node from '@/three/object/components/node';
import Line from '@/three/object/components/line';

const toolbar = useToolbar()

const show = computed(() => toolbar.show)

let lastTimeCache: any[] | null = null

function controlNode(node: Node, hl = false) {
  node.setPointSelected(hl)
}

function controlLine(line: Line, hl = false) {
  if (hl) {
    line.setLineColor(0xff0000)
  } else {
    line.setLineColor(0xffffff)
  }
}

function highlightSelectPoint(start: number, end: number) {
  if (lastTimeCache) {
    lastTimeCache.forEach((item) => {
      if (item instanceof Node) {
        controlNode(item, false)
      } else if (item instanceof Line) {
        controlLine(item, false)
      }
    })
  }
  const { nodes, edges } = findShortestRoad(core, start, end)

  nodes.forEach((item) => {
    if (item instanceof Node) {
      controlNode(item, true)
    }
  })
  edges.forEach((item) => {
    if (item instanceof Line) {
      controlLine(item, true)
    }
  })
  lastTimeCache = [...nodes, ...edges]
}

// @ts-expect-error: 临时解决ts报错
window.highlightSelectPoint = highlightSelectPoint
</script>

<template>
  <el-drawer v-model="show" title="开发模式功能栏" direction="ltr">
    <span>Hi, there!</span>
  </el-drawer>
</template>