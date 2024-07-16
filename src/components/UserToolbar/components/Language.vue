<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElDialog, ElRadioGroup, ElRadio, ElButton } from 'element-plus';
import { onMounted, ref } from 'vue';
import i18n from '@/locales'

const dialogVisible = ref(false);
const currentLanguage = ref(i18n.global.locale);

function modifyLanguage() {
  i18n.global.locale = currentLanguage.value
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog append-to-body v-model="dialogVisible" title="Choose Language" width="500">
    <el-radio-group v-model="currentLanguage">
      <el-radio v-for="item in i18n.global.availableLocales" :value="item" :key="item">
        {{
          $t(`language.name`, item)
        }}
      </el-radio>
    </el-radio-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="modifyLanguage">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
  <OperateButton popover="Language" :popover-width="180" @click="dialogVisible = true">
    <SvgIcon name="language" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>
