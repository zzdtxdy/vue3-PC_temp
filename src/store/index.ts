/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-04 19:04:54
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-04 11:07:06
 * @FilePath: \项目\vue3-PC_temp\src\store\index.ts
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store)
}

// export * from './modules/app'
export * from './modules/permission'
// export * from './modules/settings'
// export * from './modules/tagsView'
export * from './modules/user'
export { store }
