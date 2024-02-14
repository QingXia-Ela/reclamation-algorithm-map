import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import core from './three'
import pinia from './store'
import 'element-plus/dist/index.css'

if (import.meta.hot) {
  import.meta.hot.accept("./three", (module) => {
    location.reload()
  })
}

// 保证地图能够渲染，不会因为引入后没有使用而被清除
core;

const app = createApp(App)

app.use(pinia)

app.mount('#app')
