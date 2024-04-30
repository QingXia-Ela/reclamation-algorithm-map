<script lang="ts" setup>
import { ref, watch } from 'vue';
import Mask from '../Mask.vue';

const showModel = defineModel("show", {
  default: false,
})

const props = defineProps<{
  useMask?: boolean
}>()

const animateShow = ref(false)
const hide = ref(true)
let id: number | null = null

watch(
  () => showModel.value,
  (newValue) => {
    clearTimeout(id as number)

    if (newValue) {
      hide.value = false
      setTimeout(() => {
        animateShow.value = true
      })
    } else {
      animateShow.value = false
      id = setTimeout(() => {
        hide.value = true
      }, 300) as unknown as number;
    }
  }
)
</script>

<template>
  <Mask v-if="props.useMask" :active="animateShow" :opacity="0" />
  <div class="sidebar_wrapper" :style="{
    display: hide ? 'none' : 'flex',
    opacity: animateShow ? 1 : 0,
    pointerEvents: animateShow ? 'auto' : 'none'
  }">
    <div class="title">
      <slot name="title" />
    </div>
    <div class="sidebar_container">
      <slot />
    </div>
    <div class="bottom_operate">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar_wrapper {
  z-index: 1000;
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  padding: 2rem 4rem 2rem 2rem;
  background-image: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 5%, rgba(0, 0, 0, 1) 100%);
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}

.sidebar_container {
  flex: 1;
  overflow-y: auto;
}

.title {
  font-weight: 700;
  color: #fff;
  font-size: 1.8rem;
  padding-bottom: 1rem;
}

.bottom_operate {
  padding-top: 1rem;
}
</style>
