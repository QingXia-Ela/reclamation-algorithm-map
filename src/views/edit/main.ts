import { createApp } from 'vue'
import '../../style.css'
import App from './App.vue'
import core from '@/three'
import pinia from '@/store'
// import 'element-plus/dist/index.css'
// theme
import '../../styles/element/theme.scss'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:svg-icons-register'
import { getDataFromLocal } from '@/utils/three/localStoreMapData'
import { ElMessage } from 'element-plus'

// 保证地图能够渲染，不会因为引入后没有使用而被清除
// @ts-ignore
window.MapCore = core;


const app = createApp(App)

app.use(pinia)

app.mount('#app')

const map = getDataFromLocal()

const mainUrl = '/reclamation-algorithm-map/maps/map_main.json'

if (map) {
  try {
    await core.loadData(map)
    ElMessage.success("已读取缓存内地图内容")
  } catch (e) {
    ElMessage.error("读取地图失败，请联系地图作者在浏览器取回之前的地图数据！")
    localStorage.setItem("reclamation-algorithm-old-map", JSON.stringify(map))
    await core.loadDefaultData(mainUrl)
  }
}
else {
  await core.loadDefaultData(mainUrl)
}
