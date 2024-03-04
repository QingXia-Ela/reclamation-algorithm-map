<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton, ElFormItem, ElMessage } from 'element-plus';
import highlightSelectPoint from '@/three/utils/user/highlightSelectPoint'
import core from '@/three';

let cancel: (() => void) | null = null

function hlRoad(start: number, end: number) {
  if (isNaN(start) || isNaN(end)) {
    ElMessage({
      type: "error",
      message: "起点终点id不为数字！"
    })
  }
  cancel?.()
  const { reset } = highlightSelectPoint(core, start, end)
  cancel = reset
}

const start = ref(), end = ref()

// @ts-expect-error: 临时解决ts报错
window.highlightSelectPoint = highlightSelectPoint
</script>

<template>
  <el-form-item class="form_item" label="最短路径查询">
    <el-input class="input" placeholder="起点ID" v-model="start" />
    <el-input class="input" placeholder="终点ID" v-model="end" />
    <el-button @click="hlRoad(start, end)" type="primary">高亮路径</el-button>
    <el-button @click="cancel?.()">取消当前高亮</el-button>
  </el-form-item>
</template>

<style lang="scss" scoped>
.input {
  width: 5.5rem;
  margin-right: 1rem;
}

.form_item {
  display: flex;
}
</style>