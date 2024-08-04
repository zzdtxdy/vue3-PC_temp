/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-03 11:14:09
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-04 12:27:36
 * @FilePath: \项目\vue3-PC_temp\src\plugins\icons.ts
 */
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册所有图标
export function setupElIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
