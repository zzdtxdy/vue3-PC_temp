/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-06 21:04:59
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-07-06 21:40:35
 * @FilePath: \项目\vue3-PC_temp\src\main.ts
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
