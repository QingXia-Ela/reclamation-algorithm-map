<script setup lang="ts">
import { ElSelect, ElInput, ElCascader, ElFormItem } from 'element-plus';

const size = defineModel<number>({
  set(v) {
    return Number(v)
  }
})
</script>

<template>
  <el-form-item class="form_item" label="地图背景大小">
    <el-input type="number" placeholder="背景大小，陌域地图通常设置为 90" v-model="size" />
  </el-form-item>
</template>