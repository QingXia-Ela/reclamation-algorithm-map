<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { useCurrentAnnouncement } from '@/store/users/currentAnnouncement';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';
import Announcement from '@/markdown/announcement.md';

const announce = useCurrentAnnouncement()

function notice() {
  console.log('公告')
  announce.setCurrentAnnouncementComponent(Announcement)
  announce.showDialog()
}

onMounted(() => {
  if (process.env.NODE_ENV === 'production') {
    if (sessionStorage.getItem('hasOpen') === 'true') {
      return
    }
    sessionStorage.setItem('hasOpen', 'true')
    console.log(1);
    notice()
  }
})
</script>

<template>
  <OperateButton popover="网站更新公告" :popover-width="180" @click="notice">
    <SvgIcon name="announce" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>
