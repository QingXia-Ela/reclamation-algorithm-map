
<script setup>
import { computed } from 'vue'
defineEmits(['click'])

const props = defineProps({
  disabled: Boolean
})

const class_style = computed(() => ({
  operate_button: true,
  disabled: props.disabled
}))
</script>

<template>
  <div :class="class_style" @click="$emit('click')">
    <div class="title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.operate_button {
  width: 100%;
  color: #fff;
  text-align: center;
  padding: 1.6rem 0;
  opacity: 1;
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  transition: opacity 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.title {
  font-size: 1.2rem;
}
</style>
