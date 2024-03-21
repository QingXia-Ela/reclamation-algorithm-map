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
import { useCurrentNodeState } from "@/store/dev/currentNodeState";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import {
  ElForm,
  ElFormItem,
  ElDrawer,
  ElButton,
  ElMessage,
  ElDialog,
  ElInput,
} from "element-plus";
import { DEFAULT_NODE_CONFIG } from "@/constants/three";
import core from "@/three";
import getJSONDataFromCore from "@/utils/three/getJSONDataFromCore";
import SizeSelector from "./components/SizeSelector.vue";
import BorderSelector from "./components/BorderSelector.vue";
import ResourcesSelector from "./components/ResourcesSelector.vue";
import TypeSelector from "./components/TypeSelector.vue";
import WeatherSelector from "./components/WeatherSelector.vue";
import NoteSelector from "./components/NoteSelector.vue";
import MapSelector from "./components/MapSelector.vue";
import { saveDataToLocal, getDataFromLocal } from "@/utils/three/localStoreMapData";
import { useCurrentNode } from "@/store/users/currentNode";
import MainResourceSelector from "./components/MainResourceSelector.vue";
import RegularResourceSelector from "./components/RegularResourceSelector.vue";
import merge from "lodash/merge";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

const currentNodeState = useCurrentNodeState();
const userNodeState = useCurrentNode();
const active = ref(currentNodeState.showSidebar);
const currentNode = computed(() => currentNodeState.getCurrentNode());

/**
 * @type {import('vue').Ref<NodeProps>}
 */
const infoData = ref({
  // todo!: optimize this
  ...DEFAULT_NODE_CONFIG,
});

//  观察当前节点的数据，并同步到表单
watch(
  () => currentNode.value?.options,
  (val) => {
    if (val) {
      infoData.value = merge({}, DEFAULT_NODE_CONFIG, val);
    }
  }
);

watch(
  () => currentNodeState.showSidebar,
  (val) => {
    active.value = val;
  }
);

function showSidebar() {
  active.value = true;
  currentNodeState.show();
}

function hideSidebar() {
  active.value = false;
  currentNodeState.hide();
  saveDataToLocal(core)
}

const dialogVisible = ref(false);
/**
 * 显示删除确认
 */
function showDeleteDialog() {
  dialogVisible.value = true;
}

/**
 * 删除当前节点
 */
function deleteNode() {
  if (currentNodeState.deleteCurrentNode()) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    hideSidebar();
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    });
  }

  dialogVisible.value = false;
}

/**
 * 保存当前节点数据
 *
 * @param {NodeProps} options 新节点配置
 */
function saveData(options) {
  currentNodeState.updateCurrentNode(options);
  hideSidebar();
  ElMessage({
    message: "保存成功",
    type: "success",
  });
}

// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (currentNodeState.showSidebar && e.key === "Enter") {
      saveData(infoData.value);
    }
  })
})
</script>

<template>
  <el-dialog title="删除确认" width="500" v-model="dialogVisible">
    <span>是否确认删除当前节点: {{ currentNode?.options.name }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteNode"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-drawer v-model="active" :before-close="hideSidebar">
    <template #header>
      <h2>新建/编辑节点数据</h2>
    </template>
    <template #default>
      <el-form :model="infoData" @before-close="saveData(infoData)" style="color: var(--el-color-white);">
        <el-form-item label="节点模型UUID">
          {{ currentNode?.uuid }}
        </el-form-item>
        <el-form-item label="节点ID">
          {{ currentNode?.nodeId }}
        </el-form-item>
        <el-form-item label="节点X坐标">
          {{ currentNode?.x }}
        </el-form-item>
        <el-form-item label="节点Y坐标">
          {{ currentNode?.y }}
        </el-form-item>
        <!-- todo!: 名字实现自动补全 -->
        <el-form-item label="节点名字">
          <el-input v-model="infoData.name" v-focus />
        </el-form-item>
        <size-selector v-model="infoData.size" />
        <border-selector v-model="infoData.border" />
        <map-selector v-model="infoData.name" />
        <type-selector v-model="infoData.type" :name="infoData.name" />
        <weather-selector v-model="infoData.weather" />
        <!-- <resources-selector v-model="infoData.resources" /> -->
        <main-resource-selector v-model="infoData.mainResources" />
        <regular-resource-selector v-model="infoData.regularResources" />
        <note-selector v-model="infoData.note" :name="infoData.name" />
        <el-form-item label="展示用户布局组件信息">
          <el-button type="primary" @click="userNodeState.setNode(currentNode), hideSidebar()">点击展示</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <el-button @click="hideSidebar">取消</el-button>
      <el-button type="danger" @click="showDeleteDialog">删除节点</el-button>
      <el-button type="primary" @click="saveData(infoData)">保存(Enter)</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
