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
import { ElForm, ElFormItem, ElDrawer, ElButton, ElMessage, ElDialog, ElInput } from 'element-plus'
import { DEFAULT_NODE_CONFIG } from '@/constants/three'
import { el } from 'element-plus/es/locale/index.mjs';

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

const currentNodeState = useCurrentNodeState()

const active = ref(currentNodeState.showSidebar)

/**
 * @type {import('vue').Ref<NodeProps>}
 */
const infoData = ref({
  // todo!: optimize this
  ...DEFAULT_NODE_CONFIG
})

//  观察当前节点的数据，并同步到表单
watch(() => currentNodeState.node?.options, (val) => {
  if (val) {
    infoData.value = val
  }
})

watch(() => currentNodeState.showSidebar, (val) => {
  active.value = val
})


function showSidebar() {
  active.value = true
  currentNodeState.show()
}

function hideSidebar() {
  active.value = false
  currentNodeState.hide()
}

const dialogVisible = ref(false)
/**
 * 显示删除确认
 */
function showDeleteDialog() {
  dialogVisible.value = true
}

/**
 * 删除当前节点
 */
function deleteNode() {
  if (currentNodeState.deleteCurrentNode()) {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    hideSidebar()
  }
  else {
    ElMessage({
      message: '删除失败',
      type: 'error',
    })
  }

  dialogVisible.value = false
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
  <el-dialog title="删除确认" width="500" v-model="dialogVisible">
    <span>是否确认删除当前节点: {{ currentNodeState.node?.options.name }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteNode">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-drawer v-model="active" :before-close="hideSidebar">
    <template #header>
      <h2>新建/编辑节点数据</h2>
    </template>
    <template #default>
      <el-form :model="infoData" @before-close="saveData(infoData)">
        <el-form-item label="节点UUID">
          {{ currentNodeState.node?.uuid }}
        </el-form-item>
        <el-form-item label="节点名字">
          <el-input v-model="infoData.name" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="hideSidebar">取消</el-button>
      <el-button type="danger" @click="showDeleteDialog">删除节点</el-button>
      <el-button type="primary" @click="saveData(infoData)">保存</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped></style>