/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-16 20:34:34
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 20:27:07
 * @FilePath: \vue3-PC_temp\src\lang\index.ts
 */
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStoreHook } from '@/store/modules/app'
// 本地语言包
import enLocale from './modules/en.json'
import zhCnLocale from './modules/zh.json'

const appStore = useAppStoreHook()

const i18n = createI18n({
  legacy: false,
  locale: appStore.language,
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
