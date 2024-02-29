<script setup>
import { ref, watch } from "vue";
import SelectorWithCount from "./components/SelectorWithCount.vue"
import { IconFormData } from "@/assets/icons";
import { ElFormItem } from "element-plus";

const data = defineModel()
</script>

<template>
  <el-form-item label="节点常规资源">
    <selector-with-count v-model="data" :FormData="IconFormData" />
  </el-form-item>
</template>