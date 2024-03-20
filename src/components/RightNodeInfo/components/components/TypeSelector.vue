<script setup>
import { NodeTypeData } from "@/constants";
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref, watch } from "vue";
import { NodeNameToTypeMap } from "../entity";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const type = defineModel();

const props = defineProps({
  name: String
})

watch(
  () => props.name,
  (n) => {
    if (NodeNameToTypeMap[n]) type.value = NodeNameToTypeMap[n]
  }
)
</script>

<template>
  <el-form-item label="节点类型">
    <el-select v-model="type">
      <el-option v-for="item in NodeTypeData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>
