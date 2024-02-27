<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { onMounted, ref, onBeforeMount } from "vue";
import { LevelMapData } from "@/assets/images/level";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const name = defineModel();

const LevelData = LevelMapData.map(({ name }) => name)
</script>

<template>
  <el-form-item label="节点地图">
    {{ LevelData.includes(name) ? name : "无匹配地图" }}
  </el-form-item>
</template>
