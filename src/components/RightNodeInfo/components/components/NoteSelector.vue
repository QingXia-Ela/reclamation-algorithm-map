<script setup>
import { ElInput, ElSelect, ElOption, ElFormItem } from "element-plus"
import { ref } from "vue";
import { NodeDescriptionData } from "@/constants/node";


const NodeDescriptions = {
  "自定义": ``,
  ...NodeDescriptionData
}

const note = defineModel()
const select = ref("自定义")

const options = [
  ...Object.keys(NodeDescriptions).map(item => ({
    value: item,
    label: item
  })),
]

function onPresetChange(value) {
  note.value = NodeDescriptions[value]
}

function onInputChange() {
  select.value = "自定义"
}
</script>

<template>
  <el-form-item label="节点描述">
    <!-- todo!: 改为 el-autocomplete -->
    <el-select v-model="select" placeholder="选择预设..." style="margin-bottom: .4rem;" @change="onPresetChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-model="note" placeholder="输入节点描述" class="input-with-select" type="textarea" />
  </el-form-item>
</template>
