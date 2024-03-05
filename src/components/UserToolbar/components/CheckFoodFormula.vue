<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElDialog } from 'element-plus';
import { ref } from 'vue';

const open = ref(false)
</script>

<template>
  <OperateButton popover="查看游戏内所有食谱（该功能由外部网站实现）" :popover-width="200" @click="open = true">
    <SvgIcon name="cook" color="#fff" style="width: 1.6rem; height: 1.6rem" />
  </OperateButton>
  <ElDialog width="80%" top="5vh" theme="dark" title="生息演算在线工具" v-model="open" @close="open = false" append-to-body>
    <div class="iframe_wrapper">
      <iframe src="https://luotianorange.github.io/SXYS-tools/" class="iframe" frameborder="0" />
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.iframe_wrapper {
  width: 100%;
  height: 80vh;
}

.iframe {
  width: 100%;
  height: 100%;
}
</style>