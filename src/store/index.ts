/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-04 19:04:54
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-17 10:45:44
 * @FilePath: \vue3-PC_temp\src\store\index.ts
 */
import { createPinia } from 'pinia'

const store = createPinia()

// // 全局注册 store
// export function setupStore(app: App<Element>) {
//   app.use(store)
// }

export * from './modules/app'
export * from './modules/auth'
// export * from './modules/settings'
// export * from './modules/tagsView'
export * from './modules/user'
export { store }
