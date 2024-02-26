<!-- 
  用户界面的关卡信息侧边栏
 -->
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import Mask from '../Mask.vue';
import { useCurrentNode } from '@/store/users/currentNode';
import LevelTitle from './components/LevelTitle.vue';

const animateShow = ref(false)
const hide = ref(true)
const currentNode = useCurrentNode()
let id = null

watch(
  () => currentNode.node,
  (newValue) => {
    clearTimeout(id)

    if (newValue) {
      hide.value = false
      nextTick(() => {
        animateShow.value = true
      })
    } else {
      animateShow.value = false
      id = setTimeout(() => {
        hide.value = true
      }, 300);
    }
  }
)

function cleanNode() {
  currentNode.setNode(null)
}
</script>

<template>
  <div class="sidebar_wrapper" :style="{
    display: hide ? 'none' : 'block',
    opacity: animateShow ? 1 : 0,
    pointerEvents: animateShow ? 'auto' : 'none'
  }">
    <LevelTitle />
  </div>
  <Mask :active="animateShow" :opacity="0" @click="cleanNode" />
</template>

<style lang="scss" scoped>
.sidebar_wrapper {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  // 透明渐变到黑色，从左往右
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%);
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}
</style>