<!-- 
  用户界面的关卡信息侧边栏
 -->
<script setup>
import { nextTick, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue';
import Mask from '../Mask.vue';
import { useCurrentNode } from '@/store/users/currentNode';
import LevelTitle from './components/LevelTitle.vue';
import Description from './components/Description.vue';
import Operate from './components/Operate/index.vue';

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
      // 使用 requestAnimeFrame 是因为 vue 的 nextTick 是微任务
      // 在 nextTick 之后进行变量修改的操作会被作为一个新的微任务进行执行
      // 这种任务会被当做一个事件循环内部的一个微任务进行执行
      // 这导致 vue 会将 `hide` 和 `animateShow` 两个变量的修改算作一次更新
      // 但是 UI 更新的宏任务执行时机是在所有微任务完成后，也就意味着 UI 更新时发现了两个变量都已修改
      // 进而在渲染新 DOM 时直接展示的是动画播放完成状态，从而导致 css 动画无效
      // setTimeout 等宏任务均可替代 requestAnimationFrame
      requestAnimationFrame(() => {
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
    display: hide ? 'none' : 'flex',
    opacity: animateShow ? 1 : 0,
    pointerEvents: animateShow ? 'auto' : 'none'
  }">
    <div class="sidebar_limiter">
      <LevelTitle />
      <Description />
      <Operate />
    </div>
  </div>
  <Mask :active="animateShow" :opacity="0" @click="cleanNode" />
</template>

<style lang="scss" scoped>
.sidebar_wrapper {
  z-index: 100;
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  padding: 10vh 0;
  // 透明渐变到黑色，从左往右
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.9) 100%);
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}

.sidebar_limiter {
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  height: 100%;
  gap: 2rem;
}
</style>