/*
 * @Description: 国际化配置
 * @Author: zhongzd
 * @Date: 2024-08-16 20:34:34
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-21 13:51:30
 * @FilePath: \zzd\vue3-PC_temp\src\lang\index.ts
 */
import { createI18n } from 'vue-i18n'
import { useAppStoreHook } from '@/store/modules/app'
import yaml from 'js-yaml'
// 本地语言包
import enLocale from './modules/en.yaml'
import zhCnLocale from './modules/zh.yaml'

const appStore = useAppStoreHook()

const messages = {
  'zh-cn': yaml.load(zhCnLocale) as any,
  en: yaml.load(enLocale) as any
}

const i18n = createI18n({
  legacy: false, // 是否使用Vue 2的兼容模式
  locale: appStore.language, // 当前语言
  messages,
  globalInjection: true // 将I18n实例自动注入到根Vue实例和所有子组件中 不用手动导入useI18n 直接使用$t方法来获取翻译文本
})

export default i18n
