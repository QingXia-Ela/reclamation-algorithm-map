import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import core from './three'
import pinia from './store'
import 'element-plus/dist/index.css'

core;

if (import.meta.hot) {
  import.meta.hot.accept("./three", (module) => {
    location.reload()
  })
}

const app = createApp(App)

app.use(pinia)

app.mount('#app')
