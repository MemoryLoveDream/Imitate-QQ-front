import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/css/base.less'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

const app = createApp(App)
app.use(ElementPlus).use(router)
app.use(createPinia().use(piniaPluginPersistedstate))
app.mount('#app')

export default app
