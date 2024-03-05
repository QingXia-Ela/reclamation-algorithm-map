<script setup>
import OperateButton from './OperateButton.vue';
</script>

<template>
  <div class="toolbar_wrapper">
    <OperateButton>Test</OperateButton>
    <OperateButton>Test</OperateButton>
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
  // transform: translateY(70%) translateX(-50%);
  transform: translateY(-20%) translateX(-50%);
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: translateY(-20%) translateX(-50%);
  }
}
</style>