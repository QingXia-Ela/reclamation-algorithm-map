<script setup>
import { ElDialog, ElButton } from 'element-plus'
import { ref, computed, onUpdated } from 'vue';
import Announcement from '@/markdown/announcement.md'
import { useCurrentAnnouncement } from '@/store/users/currentAnnouncement';
import 'github-markdown-css/github-markdown-dark.css'

const currentAnnouncementStore = useCurrentAnnouncement()

const AnnouncementComponent = computed(() => {
  return currentAnnouncementStore.getCurrentAnnouncementComponent()
})
</script>

<template>
  <ElDialog width="40rem" top="15vh" title="公告" v-model="currentAnnouncementStore.show"
    @close="currentAnnouncementStore.hideDialog()">
    <div class="dialog">
      <component :is="AnnouncementComponent" />
    </div>
    <template #footer>
      <el-button @click="currentAnnouncementStore.hideDialog()">确认</el-button>
      <el-button @click="currentAnnouncementStore.hideDialog()" type="primary">确定</el-button>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.dialog {
  padding: 1rem;
  max-height: 30rem;
  overflow-y: auto;

  .markdown-body {
    background-color: #141414;
    height: 100%;
  }
}
</style>