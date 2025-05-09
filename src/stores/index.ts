/*
 * @Description: store
 * @Author: zhongzd
 * @Date: 2024-11-18 11:18:10
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-24 16:49:37
 * @FilePath: \vue3-PC_temp\src\store\index.ts
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia persist
const pinia = createPinia()
pinia.use((context) => {
  console.log('Pinia plugin registered', context)
})
pinia.use(piniaPluginPersistedstate)

export default pinia
export * from './modules/app'
export * from './modules/auth'
// export * from './modules/global'
export * from './modules/user'
export * from './modules/tabs'

export { pinia }
