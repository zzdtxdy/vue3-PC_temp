/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-04 19:04:54
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 18:20:01
 * @FilePath: \vue3-PC_temp\src\store\index.ts
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia persist
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
