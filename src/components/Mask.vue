<!-- 
  组件内遮罩组件，更方便自定义操作
 -->
<template>
  <div class="mask" :style="style" ref="mask"></div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#000000'
  },
  opacity: {
    type: Number,
    default: 0.5
  }
})

const mask = ref<HTMLDivElement>()

const style = computed(() => ({
  display: props.active ? 'block' : 'none',
  backgroundColor: props.color,
  opacity: props.opacity
}))

defineExpose({
  mask
})
</script>


<style lang="scss" scoped>
.mask {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>