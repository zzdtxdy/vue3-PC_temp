// import defaultSettings from '@/settings'
// import { defineStore } from 'pinia'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import en from 'element-plus/es/locale/lang/en'
// import { localGet, localSet } from '@/utils'
// import piniaPersistConfig from '@/store/persistConfig'
// import store from '@/store'

// export const useGlobalStore = defineStore(
//   'global',
//   () => {
//     // 从 localStorage 获取存储的全局设置
//     const localSettings = localGet('global') || {}

//     // 定义各个属性
//     /** 系统标题 */
//     const title = ref(localSettings.title || defaultSettings.title)
//     /** 系统版本 */
//     const version = ref(localSettings.version || defaultSettings.version)
//     /** 是否显示设置 */
//     const showSettings = ref(localSettings.showSettings || defaultSettings.showSettings)
//     /** 是否显示标签视图 */
//     const tagsView = ref(localSettings.tagsView || defaultSettings.tagsView)
//     /** 是否固定头部 */
//     const fixedHeader = ref(localSettings.fixedHeader || defaultSettings.fixedHeader)
//     /** 侧边栏配置 */
//     const sidebar = reactive(localSettings.sidebar || defaultSettings.sidebar)
//     /** 布局模式 */
//     const layout = ref(localSettings.layout || defaultSettings.layout)
//     /** 主题模式(是否暗黑) */
//     const isDark = ref(localSettings.isDark || defaultSettings.isDark)
//     /** 布局大小 */
//     const size = ref(localSettings.size || defaultSettings.size)
//     /** 语言 */
//     const language = ref(localSettings.language || defaultSettings.language)
//     /** 主题颜色 */
//     const themeColor = ref(localSettings.themeColor || defaultSettings.themeColor)
//     /** 是否开启水印 */
//     const watermarkEnabled = ref(localSettings.watermarkEnabled || defaultSettings.watermarkEnabled)
//     /** 水印内容 */
//     const watermarkContent = ref(localSettings.watermarkContent || defaultSettings.watermarkContent)
//     /** 设备类型 */
//     const device = ref(localSettings.device || defaultSettings.device)

//     // 定义 getters
//     /** 当前语言环境 */
//     const locale = computed(() => (language.value === 'en' ? en : zhCn))

//     // 监听属性变化并同步到 localStorage
//     watch(
//       () => ({
//         title: title.value,
//         version: version.value,
//         showSettings: showSettings.value,
//         tagsView: tagsView.value,
//         fixedHeader: fixedHeader.value,
//         sidebar: sidebar,
//         layout: layout.value,
//         isDark: isDark.value,
//         size: size.value,
//         language: language.value,
//         themeColor: themeColor.value,
//         watermarkEnabled: watermarkEnabled.value,
//         watermarkContent: watermarkContent.value,
//         device: device.value
//       }),
//       (newValue) => {
//         localSet('app', newValue)
//       },
//       { deep: true }
//     )

//     // 定义 actions
//     /**
//      * 设置全局状态
//      * @param key 状态键
//      * @param value 状态值
//      */
//     function setGlobalState(key: string, value: any) {
//       switch (key) {
//         case 'title':
//           title.value = value
//           break
//         case 'version':
//           version.value = value
//           break
//         case 'showSettings':
//           showSettings.value = value
//           break
//         case 'tagsView':
//           tagsView.value = value
//           break
//         case 'fixedHeader':
//           fixedHeader.value = value
//           break
//         case 'sidebar':
//           Object.assign(sidebar, value)
//           break
//         case 'layout':
//           layout.value = value
//           break
//         case 'isDark':
//           isDark.value = value
//           break
//         case 'size':
//           size.value = value
//           break
//         case 'language':
//           language.value = value
//           break
//         case 'themeColor':
//           themeColor.value = value
//           break
//         case 'watermarkEnabled':
//           watermarkEnabled.value = value
//           break
//         case 'watermarkContent':
//           watermarkContent.value = value
//           break
//         case 'device':
//           device.value = value
//           break
//         default:
//           console.warn(`Unknown key: ${key}`)
//       }
//     }

//     return {
//       title,
//       version,
//       showSettings,
//       tagsView,
//       fixedHeader,
//       sidebar,
//       layout,
//       isDark,
//       size,
//       language,
//       themeColor,
//       watermarkEnabled,
//       watermarkContent,
//       device,
//       locale,
//       setGlobalState
//     }
//   },
//   {
//     persist: piniaPersistConfig('global')
//   }
// )

// export function useGlobalStoreHook() {
//   return useGlobalStore(store)
// }
