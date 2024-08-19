/*
 * @Description: 国际化配置
 * @Author: zhongzd
 * @Date: 2024-08-16 20:34:34
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-17 20:47:35
 * @FilePath: \vue3-PC_temp\src\lang\index.ts
 */
import { createI18n } from 'vue-i18n'
import { useAppStoreHook } from '@/store/modules/app'
import yaml from 'js-yaml'
// 本地语言包
import enLocale from './modules/en.yaml'
import zhCnLocale from './modules/zh-cn.yaml'

const appStore = useAppStoreHook()

const messages = {
  'zh-cn': yaml.load(zhCnLocale),
  en: yaml.load(enLocale)
}

const i18n = createI18n({
  legacy: false,
  locale: appStore.language,
  messages: messages,
  globalInjection: true
})

export default i18n
