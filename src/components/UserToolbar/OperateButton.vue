<script setup>
import { ElPopover } from 'element-plus';
import { computed } from 'vue';

defineEmits(['click'])

const props = defineProps({
  disabled: Boolean,
  popover: String
})

const className = computed(() => ({
  operate_button: true,
  disabled: props.disabled
}))
</script>

<template>
  <el-popover placement="top" trigger="hover" effect="dark" :disabled="!props.popover" :content="props.popover">
    <template #reference>
      <div :class="className" @click="$emit('click')">
        <slot />
      </div>
    </template>
  </el-popover>
</template>

<style lang="scss" scoped>
.operate_button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 3rem;
  transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  &.disabled {
    opacity: 0.3;
    pointer-events: none;
    cursor: not-allowed;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:first-child {
    border-radius: 50vh 0 0 50vh;
    padding-right: .6rem;
  }

  &:last-child {
    border-radius: 0 50vh 50vh 0;
    padding-left: .6rem;
  }
}
</style>
