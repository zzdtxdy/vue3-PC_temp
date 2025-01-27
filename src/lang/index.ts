/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-16 20:34:34
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-20 16:57:20
 * @FilePath: \vue3-PC_temp\src\lang\index.ts
 */
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useGlobalStoreHook } from '@/store/modules/global'
// 本地语言包
import enLocale from './modules/en.json'
import zhCnLocale from './modules/zh.json'

const globalStore = useGlobalStoreHook()

const i18n = createI18n({
  legacy: false,
  locale: globalStore.language,
  messages: {
    'zh-cn': zhCnLocale,
    en: enLocale
  },
  globalInjection: true
})

// 全局注册 i18n
export function setupI18n(app: App<Element>) {
  app.use(i18n)
}

export default i18n
