<script setup>
import OperateButton from './OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import CheckFoodFormula from './components/CheckFoodFormula.vue';
import QueryShortestRoad from './components/QueryShortestRoad.vue';
import FindNode from './components/FindNode/index.vue';
import Knowledge from './components/Knowledge.vue';
import Notification from './components/Notification.vue';
import MapSwitch from './components/MapSwitch.vue'
import ResetCamera from './components/ResetCamera.vue';
import DownloadCurrentMap from './components/DownloadCurrentMap.vue';
import BluePrint from './components/BluePrint.vue';
import ViewAnimateRoute from './components/ViewAnimateRoute.vue';
import Language from './components/Language.vue';
import throttle from 'lodash/throttle';
import { ref, computed, onMounted } from 'vue';

const showUserToolbar = ref(false)

let timerId = null
let mobileMode = false

function onMouseEnter() {
  if (mobileMode) return
  clearTimeout(timerId)
  showUserToolbar.value = true
}

function onMouseLeave() {
  if (mobileMode) return
  timerId = setTimeout(() => {
    showUserToolbar.value = false
  }, 3000);
}

const className = computed(() => ({
  toolbar_wrapper: true,
  show: showUserToolbar.value
}))

// todo!: refactor judge
function judgeMobile() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isMobileViewport = window.innerWidth < 768
  if (isMobile || isMobileViewport) {
    mobileMode = true
    showUserToolbar.value = true
  } else {
    mobileMode = false
    showUserToolbar.value = false
  }
}

// template doesn't support use it directly
const dev = __DEV__

/** @type {import('vue').Ref<import('@/three/types/map').MapType>} */
const currentMapType = ref("main")

onMounted(() => {
  judgeMobile()
  document.addEventListener('resize', throttle(() => {
    judgeMobile()
  }, 1000))
})
</script>

<template>
  <!-- todo!: 修复内部popover元素悬浮时工具栏仍然隐藏的问题 -->
  <div :class="className" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <Language />
    <CheckFoodFormula />
    <BluePrint />
    <QueryShortestRoad />
    <FindNode />
    <ResetCamera />
    <MapSwitch v-model:mapType="currentMapType" />
    <DownloadCurrentMap v-model:mapType="currentMapType" />
    <ViewAnimateRoute />
    <Knowledge />
    <Notification />
  </div>
</template>

<style lang="scss" scoped>
.toolbar_wrapper {
  display: flex;
  position: fixed;
  left: 50%;
  bottom: 0;
  height: 3rem;
  border-radius: 50vh;
  color: #fff;
  background-color: #121212;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 1);
  transform: translateY(2.2rem) translateX(-50%);
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.show {
    transform: translateY(-0.5rem) translateX(-50%);
  }
}
</style>