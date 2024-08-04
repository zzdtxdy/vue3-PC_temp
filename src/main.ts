/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-09 19:06:11
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-03 11:17:37
 * @FilePath: \项目\vue3-PC_temp\src\main.ts
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import setupPlugins from '@/plugins'

const app = createApp(App)

// 注册插件
app.use(setupPlugins)
app.mount('#app')
