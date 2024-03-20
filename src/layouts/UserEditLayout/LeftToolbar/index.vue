<script setup lang="ts">
import { useToolbar } from '@/store/dev/toolbar';
import { ref, watch } from 'vue';
import { ElDrawer, ElForm, ElButton, ElMessage } from 'element-plus';
import { useMask } from '@/store/dev/mask';
import { useGlobalState } from '@/store/dev/globalState';
import SwitchMapType from './components/SwitchMapType.vue';
import BackgroundSize from './components/BackgroundSize.vue';
import BackgroundSelect from './components/BackgroundSelect.vue';
import SetMapName from './components/SetMapName.vue';
import { saveDataToLocal } from '@/utils/three/localStoreMapData';
import core from '@/three';
import { SaveMapData } from '@/three/types/data';

const toolbar = useToolbar()
const mask = useMask()
const globalState = useGlobalState()

const show = ref(false)

function setGlobalState(n: boolean) {
  mask.setActive(n)
  globalState.setMouseOccupy(n)
}

watch(
  () => toolbar.show,
  (n) => {
    if (n !== show.value) {
      show.value = n
      setGlobalState(n)
    }
  }
)

watch(
  () => show.value,
  (n) => {
    // 保证每次开启都能获取到正确数据
    formData.value = { ...core.getMetadata() }
    if (n !== toolbar.show) {
      toolbar.toggleToolbar(n)
      setGlobalState(n)
    }
  }
)

const formData = ref<SaveMapData['metadata']>({
  ...core.getMetadata()
})

async function hideSidebar() {
  await core.setMetadata(formData.value)
  saveDataToLocal(core)
  show.value = false
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
}
</script>

<template>
  <el-drawer v-model="show" title="开发模式功能栏" direction="ltr">
    <el-form :model="formData">
      <set-map-name v-model="formData.name" />
      <switch-map-type v-model="formData.type" />
      <background-size v-model="formData.backgroundSize" />
      <background-select v-model="formData.backgroundType" />
    </el-form>

    <template #footer>
      <el-button @click="show = false">关闭</el-button>
      <el-button type="primary" @click="hideSidebar">保存</el-button>
    </template>
  </el-drawer>
</template>