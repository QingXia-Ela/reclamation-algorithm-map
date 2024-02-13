import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import core from './three'

if (import.meta.hot) {
  import.meta.hot.accept("./three", (module) => {
    location.reload()
  })
}

createApp(App).mount('#app')
