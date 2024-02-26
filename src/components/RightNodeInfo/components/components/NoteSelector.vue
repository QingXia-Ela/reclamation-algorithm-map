<script setup>
import { ElInput, ElSelect, ElOption, ElFormItem, ElAutocomplete } from "element-plus"
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

function querySearch(queryString, cb) {
  const results = queryString ? options.filter(createFilter(queryString)) : options;
  cb(results);
}

function createFilter(queryString) {
  return (option) => {
    return (option.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}

</script>

<template>
  <el-form-item label="节点描述">
    <!-- todo!: 改为 el-autocomplete -->
    <!-- <el-select v-model="select" placeholder="选择预设..." style="margin-bottom: .4rem;" @change="onPresetChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select> -->
    <el-autocomplete v-model="select" :fetch-suggestions="querySearch" placeholder="选择预设..." style="margin-bottom: .4rem;"
      @select="onPresetChange" class="input-with-select">
    </el-autocomplete>
    <el-input v-model="note" placeholder="输入节点描述" class="input-with-select" type="textarea" />
  </el-form-item>
</template>
