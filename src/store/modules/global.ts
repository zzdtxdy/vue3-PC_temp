/*
 * @Description:全局配置
 * @Author: zhongzd
 * @Date: 2024-09-22 18:51:13
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-20 17:04:53
 * @FilePath: \vue3-PC_temp\src\store\modules\global.ts
 */
import defaultSettings from '@/settings'
import { defineStore } from 'pinia'
// import piniaPersistConfig from "@/stores/helper/persist";
import piniaPersistConfig from '@/store/persistConfig'
// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { localGet } from '@/utils'
import store from '@/store'

export const useGlobalStore = defineStore({
  id: 'global',
  // 修改默认值之后，需清除 localStorage 数据
  state: (): AppSettings => {
    console.log(localGet('global'))

    return localGet('global') ?? defaultSettings
  },
  getters: {
    /**
     * 根据语言标识读取对应的语言包
     */
    locale: (state) => (state.language == 'en' ? en : zhCn)
  },
  actions: {
    setGlobalState(...args: any[]) {
      this.$patch({ [args[0]]: args[1] })
    }
  },
  persist: piniaPersistConfig('global')
})
export function useGlobalStoreHook() {
  return useGlobalStore(store)
}
