<!-- 
  编辑节点表单

  节点声明：`src/three/types/node.ts` => `NodeProps`

  参考：https://element-plus.gitee.io/zh-CN/component/form.html

  保存时机如下：
  - 数据变化
  - 侧边栏关闭时

  未来更新：
  - 实时保存节点数据

  保存时需要弹出一个提示框
 -->

<script setup>
import { useCurrentNodeState } from '@/store/modules/currentNodeState';
import { ref, watch } from 'vue';
import { ElForm, ElFormItem, ElDrawer, ElButton, ElMessage } from 'element-plus'
import { DEFAULT_NODE_CONFIG } from '@/constants/three'

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

const currentNodeState = useCurrentNodeState()

const active = ref(currentNodeState.showSidebar)

watch(currentNodeState, (val) => {
  active.value = val.showSidebar
})

/**
 * @type {import('vue').Ref<NodeProps>}
 */
const infoData = ref({
  // todo!: optimize this
  ...(currentNodeState.nodeOptions || {}), ...DEFAULT_NODE_CONFIG
})

function showSidebar() {
  active.value = true
  currentNodeState.show()
}

function hideSidebar() {
  active.value = false
  currentNodeState.hide()
}

/**
 * 保存当前节点数据
 * 
 * @param {NodeProps} options 新节点配置
 */
function saveData(options) {
  ElMessage({
    message: '保存成功',
    type: 'success',
  })
  currentNodeState.updateCurrentNode(options)
  hideSidebar()
}
</script>

<template>
  <el-drawer v-model="active">
    <template #header>
      <h2>新建/编辑节点数据</h2>
    </template>
    <template #default>
      <el-form :model="infoData" @before-close="saveData(infoData)">
        <el-form-item label="节点UUID">
          {{ currentNodeState.node?.uuid }}
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="hideSidebar">取消</el-button>
      <el-button type="danger">删除节点</el-button>
      <el-button type="primary" @click="saveData(infoData)">保存</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
