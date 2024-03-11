<script setup>
import { ref, watch } from "vue";
import SelectorWithCount from "./components/SelectorWithCount.vue"
import { IconFormData } from "@/assets/icons";
import { ElFormItem } from "element-plus";

const data = defineModel()

// 节点资源过滤
const key = ["water", "wood", "stone", "iron", "diamond", "venison", "poultry", "crab", "beef", "gold", "goodsundry"]

const formData = IconFormData.filter((v) => key.includes(v.value))
</script>

<template>
  <el-form-item label="节点主要资源">
    <selector-with-count v-model="data" :FormData="formData" />
  </el-form-item>
</template>