import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MapCore from './three'

const core = new MapCore();

if (import.meta.hot) {
  import.meta.hot.accept("./three", (module) => {
    location.reload()
  })
}

createApp(App).mount('#app')
