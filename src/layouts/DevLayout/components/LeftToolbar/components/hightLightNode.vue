<script setup lang="ts">
import { ref } from 'vue';
import { ElSelect, ElOption, ElButton, ElFormItem } from 'element-plus';
import { highlightPointByType } from '@/three/utils/user/highlightPoint'
import core from '@/three';
import { NodeTypeData } from '@/constants';
import { NodeType } from '@/three/types/node';

const select = ref<NodeType>()

let cancel: (() => void) | null = null

// todo!: 升级高亮函数，使得每次的高亮处理是独立的
function hlNode() {
  if (select.value) {
    const { reset } = highlightPointByType(core, select.value)
    cancel = reset
  }
}
</script>

<template>
  <el-form-item class="form_item" label="高亮节点">
    <el-select v-model="select" placeholder="请选择" style="width: 9rem;margin-right: 1rem;">
      <el-option v-for="item in NodeTypeData" :key="item.value" :value="item.value" :label="item.label" />
    </el-select>
    <el-button @click="hlNode" type="primary">高亮该类型节点</el-button>
    <el-button @click="cancel?.()">取消高亮</el-button>
  </el-form-item>
</template>