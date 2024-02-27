<!-- 
  用户界面 - 功能选单


  - 查看关卡地图
  - 查看敌人详情
  - 查看节点资源
  - 查看区块升级所需材料
 -->

<script setup>
import OperateButton from './OperateButton.vue';
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer";
import { computed, onUpdated, ref } from 'vue';
import { useCurrentNode } from '@/store/users/currentNode';
import { LevelMapData } from '@/assets/images/level';

let $viewer = null

const inited = (viewer) => {
  $viewer = viewer
}

const currentNode = useCurrentNode()

const url = computed(() => {
  const name = currentNode.node?.options.name
  return LevelMapData.find(item => item.name === name)?.src
})
const images = computed(() => url.value ? [url.value] : [])

function showMapImage() {
  if (url.value) {
    $viewer.show()
  }
}
</script>

<template>
  <div class="operate_wrapper">
    <viewer @inited="inited" :images="images" style="display: none;">
      <template #default="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
        {{ scope.options }}
      </template>
    </viewer>
    <OperateButton @click="showMapImage" :disabled="!url">查看关卡地图</OperateButton>
    <OperateButton>查看节点资源</OperateButton>
  </div>
</template>

<style lang="scss" scoped>
.operate_wrapper {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  margin: 0 3.6rem;
}
</style>
