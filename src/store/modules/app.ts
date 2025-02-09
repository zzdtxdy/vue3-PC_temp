import defaultSettings from '@/settings'
import { defineStore } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import piniaPersistConfig from '@/store/persistConfig'
import store from '@/store'
import { LanguageType } from '../interface'

export const useAppStore = defineStore(
  'app',
  () => {
    // 定义各个属性
    /** 系统标题 */
    const title = ref(defaultSettings.title)
    /** 系统版本 */
    const version = ref(defaultSettings.version)
    /** 是否显示设置 */
    const showSettings = ref(defaultSettings.showSettings)
    /** 是否显示标签视图 */
    const tagsView = ref(defaultSettings.tagsView)
    /** 是否固定头部 */
    const fixedHeader = ref(defaultSettings.fixedHeader)
    /** 侧边栏配置 */
    const sidebar = reactive(defaultSettings.sidebar)
    /** 布局模式 */
    const layout = ref(defaultSettings.layout)
    /** 主题模式(是否暗黑) */
    const isDark = ref(defaultSettings.isDark)
    /** 布局大小 */
    const size = ref(defaultSettings.size)
    /** 语言 */
    const language = ref<LanguageType>(defaultSettings.language)
    /** 主题颜色 */
    const themeColor = ref(defaultSettings.themeColor)
    /** 是否开启水印 */
    const watermarkEnabled = ref(defaultSettings.watermarkEnabled)
    /** 水印内容 */
    const watermarkContent = ref(defaultSettings.watermarkContent)
    /** 设备类型 */
    const device = ref(defaultSettings.device)

    // 定义 getters
    /** 当前语言环境 */
    const locale = computed(() => (language.value === 'en' ? en : zhCn))

    // 定义 actions
    /**
     * 设置全局状态
     * @param key 状态键
     * @param value 状态值
     */
    function setGlobalState<K extends keyof AppSettings>(key: K, value: any) {
      switch (key) {
        case 'title':
          title.value = value
          break
        case 'version':
          version.value = value
          break
        case 'showSettings':
          showSettings.value = value
          break
        case 'tagsView':
          tagsView.value = value
          break
        case 'fixedHeader':
          fixedHeader.value = value
          break
        case 'sidebar':
          Object.assign(sidebar, value)
          break
        case 'layout':
          layout.value = value
          break
        case 'isDark':
          isDark.value = value
          break
        case 'size':
          size.value = value
          break
        case 'language':
          language.value = value
          break
        case 'themeColor':
          themeColor.value = value
          break
        case 'watermarkEnabled':
          watermarkEnabled.value = value
          break
        case 'watermarkContent':
          watermarkContent.value = value
          break
        case 'device':
          device.value = value
          break
        default:
          console.warn(`Unknown key: ${key}`)
      }
    }

    return {
      title,
      version,
      showSettings,
      tagsView,
      fixedHeader,
      sidebar,
      layout,
      isDark,
      size,
      language,
      themeColor,
      watermarkEnabled,
      watermarkContent,
      device,
      locale,
      setGlobalState
    }
  },
  {
    persist: piniaPersistConfig('app')
  }
)

export function useAppStoreHook() {
  return useAppStore(store)
}
