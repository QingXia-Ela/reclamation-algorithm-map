<!-- 
  用户界面 - 功能选单


  - 查看关卡地图
  - 查看敌人详情
  - 查看节点资源
  - 查看区块升级所需材料
 -->

<script setup>
import OperateButton from './OperateButton.vue';
</script>

<template>
  <div class="operate_wrapper">
    <OperateButton>查看关卡地图</OperateButton>
    <OperateButton>查看节点资源</OperateButton>
  </div>
</template>

<style lang="scss" scoped>
.operate_wrapper {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  margin: 0 3.6rem;
}
</style>
