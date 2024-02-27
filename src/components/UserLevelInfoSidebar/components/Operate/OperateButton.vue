
<script setup>
defineEmits(['click'])
</script>

<template>
  <div class="operate_button" @click="$emit('click')">
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
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.title {
  font-size: 1.2rem;
}
</style>
