<script setup>
import { ElPopover } from 'element-plus';
import { computed, ref } from 'vue';

defineEmits(['click'])

const props = defineProps({
  disabled: Boolean,
  popover: String,
  popoverWidth: {
    type: Number,
    default: 300
  },
  active: Boolean
})

const className = computed(() => ({
  operate_button: true,
  disabled: props.disabled
}))

const showPopover = ref(false)

let timerId = null
let leaveTimerId = null

function onMouseEnter() {
  clearTimeout(leaveTimerId)
  timerId = setTimeout(() => {
    showPopover.value = true
  }, 300)
}

function onMouseLeave() {
  clearTimeout(timerId)
  leaveTimerId = setTimeout(() => {
    showPopover.value = false
  }, 500);
}
</script>

<template>
  <el-popover placement="top" :disabled="!props.popover" :class="{ active: props.active }" :content="props.popover"
    popper-style="text-align: center" :visible="showPopover" :width="props.popoverWidth">
    <template #reference>
      <div :class="className" @click="$emit('click')" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <slot />
      </div>
    </template>
    <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <slot v-if="$slots.popover" name="popover" />
      <div v-else>{{ props.popover }}</div>
    </div>
  </el-popover>
</template>

<style lang="scss" scoped>
.operate_button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  &.disabled {
    opacity: 0.3;
    pointer-events: none;
    cursor: not-allowed;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    opacity: 0.6;
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:first-child {
    border-radius: 50vh 0 0 50vh;
    padding-left: 1rem;
    padding-right: .6rem;
  }

  &:last-child {
    border-radius: 0 50vh 50vh 0;
    padding-left: .6rem;
    padding-right: 1rem;
  }
}
</style>
