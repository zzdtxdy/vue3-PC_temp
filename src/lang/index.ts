/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-16 20:34:34
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-23 13:44:36
 * @FilePath: \vue3-PC_temp\src\lang\index.ts
 */
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStoreHook } from '@/stores/modules/app'
// 本地语言包
import enLocale from './modules/en.json'
import zhCnLocale from './modules/zh.json'

const globalStore = useAppStoreHook()

const i18n = createI18n({
  legacy: false, // 是否使用Vue 2的兼容模式
  locale: globalStore.language,
  messages: {
    'zh-cn': zhCnLocale,
    en: enLocale
  },
  globalInjection: true // 将I18n实例自动注入到根Vue实例和所有子组件中 不用手动导入useI18n 直接使用$t方法来获取翻译文本
})

// 全局注册 i18n
export function setupI18n(app: App<Element>) {
  app.use(i18n)
}

export default i18n
