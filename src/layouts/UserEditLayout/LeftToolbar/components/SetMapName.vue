<script setup>
import { ElFormItem, ElSelect, ElOption, ElInput } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

// 在模板中启用 v-focus
const vFocus = {
  updated: (el) => el.focus()
}
</script>

<template>
  <el-form-item label="地图名字">
    <el-input v-model="value" v-focus />
  </el-form-item>
</template>
