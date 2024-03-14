import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import core from './three'
import pinia from './store'
// import 'element-plus/dist/index.css'
// theme
import './styles/element/theme.scss'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:svg-icons-register'

// 涉及到 three 核心直接刷新页面
if (import.meta.hot) {
  import.meta.hot.accept("./three", (module) => {
    location.reload()
  })
}

// 保证地图能够渲染，不会因为引入后没有使用而被清除
// @ts-ignore
window.MapCore = core;

const app = createApp(App)

app.use(pinia)

app.mount('#app')

core.loadDefaultData()