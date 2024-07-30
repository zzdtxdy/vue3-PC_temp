/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-04 19:04:54
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-07-29 15:59:18
 * @FilePath: \zzd\vue3-PC_temp\src\stores\index.ts
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store)
}

// export * from './modules/app'
// export * from './modules/permission'
// export * from './modules/settings'
// export * from './modules/tagsView'
export * from './modules/user'
export { store }
