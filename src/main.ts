import { createApp } from 'vue'
import App from './App.vue'
// 自定义指令(directive)
import directive from '@/directive'
// vue Router
import router from '@/router'
// pinia store
import pinia from '@/store'
// vue i18n
import I18n from '@/lang/index'
// element icons
import * as Icons from '@element-plus/icons-vue'
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom dark css
import '@/styles/dark.scss'
// 本地SVG图标 在页面加载时将<symbol>注入到 <body> 中
import 'virtual:svg-icons-register'
// 样式
import '@/styles/index.scss'
import 'uno.css'

const app = createApp(App)

// register the element Icons component
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

// 注册插件
app.use(directive).use(router).use(I18n).use(pinia)
app.mount('#app')
