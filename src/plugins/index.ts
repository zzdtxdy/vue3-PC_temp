/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-03 11:14:09
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-04 12:08:45
 * @FilePath: \项目\vue3-PC_temp\src\plugins\index.ts
 */
import { setupDirective } from '@/directive'
// import { setupI18n } from '@/lang'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import type { App } from 'vue'
import { setupElIcons } from './icons'
import { setupPermission } from './permission'

export default {
  install(app: App<Element>) {
    // 自定义指令(directive)
    setupDirective(app)
    // 路由(router)
    setupRouter(app)
    // 状态管理(store)
    setupStore(app)
    // 国际化
    // setupI18n(app)
    // Element-plus图标
    setupElIcons(app)
    // 路由守卫
    setupPermission()
  }
}
