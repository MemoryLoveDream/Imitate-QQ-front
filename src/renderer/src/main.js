import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './service/router'
import 'element-plus/dist/index.css'
import '@/assets/css/base.less'

const app = createApp(App)
app.use(ElementPlus).use(router).use(createPinia().use(piniaPluginPersistedstate))
app.mount('#app')

export default app
