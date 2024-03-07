<script setup>
import OperateButton from './OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import CheckFoodFormula from './components/CheckFoodFormula.vue';
import QueryShortestRoad from './components/QueryShortestRoad.vue';
import FindNode from './components/FindNode.vue';
import Knowledge from './components/Knowledge.vue';
import Notification from './components/Notification.vue';
import MapSwitch from './components/MapSwitch.vue'
import { ref, computed } from 'vue';

const showUserToolbar = ref(false)

let timerId = null

function onMouseEnter() {
  clearTimeout(timerId)
  showUserToolbar.value = true
}

function onMouseLeave() {
  timerId = setTimeout(() => {
    showUserToolbar.value = false
  }, 3000);
}

const className = computed(() => ({
  toolbar_wrapper: true,
  show: showUserToolbar.value
}))
</script>

<template>
  <div :class="className" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <CheckFoodFormula />
    <QueryShortestRoad />
    <FindNode />
    <MapSwitch />
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