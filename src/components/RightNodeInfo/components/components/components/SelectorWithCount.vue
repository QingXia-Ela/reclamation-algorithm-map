<!-- 
  模板组件 可控参数列表

  功能：

  - 组件本体为一个列表
  - 可以展示当前列表内拥有的字段与对应数量
 -->

<script setup>
import { ElSelect, ElOption, ElRow, ElCol, ElButton, ElInputNumber, ElInput, ElMessage } from 'element-plus'
import { computed } from 'vue';
/**
 * @typedef {Array<{
 *  type: string,
 *  count: number
 * }>} CountList
 */

/**
 * @type {{ FormData: { value: string, label: string }[] }}}
 */
const props = defineProps({
  FormData: {
    type: Array,
    required: true
  }
})

const TranslateData = computed(() => {
  const res = {}
  props.FormData.forEach(item => {
    res[item.value] = item.label
  })
  return res
})

/**
 * @type {import('vue').ModelRef<CountList>}
 */
const data = defineModel()

function onSelected(type) {
  data.value.push({ type, count: 1 })
}

function deleteResouce(index) {
  data.value = data.value.filter((_, i) => i !== index)
}

function choosePreset() {
  // todo!: 完成预设选择功能
  // 使用一个大对话框进行选择

  ElMessage({
    message: '功能暂未开放',
    type: 'warning'
  })
}
</script>

<template>
  <div class="row_style">
    <el-select placeholder="选择资源..." @change="onSelected">
      <el-option v-for="item in props.FormData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary">选择预设</el-button>
  </div>
  {{ data?.length ? null : "暂无已选择的资源" }}
  <div v-for="(item, index) in data" :key="item.type" class="row_style">
    <el-input v-model="TranslateData[item.type]" disabled style="--el-disabled-text-color: #333" />
    <el-input-number v-model="item.count" style="width: 12rem;" :min="1" :max="1145" />
    <el-button type="danger" @click="deleteResouce(index)">删除</el-button>
  </div>
</template>

<style lang="scss" scoped>
.row_style {
  display: flex;
  width: 100%;
  gap: .4rem;
  margin-bottom: .4rem;
}
</style>