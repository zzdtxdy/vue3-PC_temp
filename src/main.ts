/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-09 19:06:11
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-16 17:30:50
 * @FilePath: \zzd\vue3-PC_temp\src\main.ts
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// 自定义指令(directive)
import directive from '@/directive'
// vue Router
import router from '@/router'
// pinia store
import { store } from '@/store'
// element icons
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)

// register the element Icons component
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
// 注册插件
app.use(directive).use(router).use(store)
app.mount('#app')
