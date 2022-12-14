import { createApp } from 'vue'
// import './style.css'
import './assets/less/index.less'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//import mock   使用本地mock模拟部分数据
import './api/mock.js'
//全局挂载$api
import api from './api/api'
//import pinia
import { createPinia } from 'pinia'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 全局挂载$api
app.config.globalProperties.$api = api



app.use(router)
app.use(createPinia())


app.mount('#app')
