/*
 * @Description: 系统设置
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-11 18:45:50
 * @FilePath: \vue3-PC_temp\src\stores\modules\app.ts
 */
import defaultSettings from '@/settings'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import piniaPersistConfig from '@/stores/persistConfig'
import store from '@/stores'
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
    const tabsView = ref(defaultSettings.tabsView)
    /** 是否 显示多标签导航图标 */
    const tabsIcon = ref(defaultSettings.tabsIcon)
    /** 面包屑导航 */
    const breadcrumb = ref(defaultSettings.breadcrumb)
    /** 是否 显示面包屑导航图标 */
    const breadcrumbIcon = ref(defaultSettings.breadcrumbIcon)
    /** 是否固定头部 */
    const fixedHeader = ref(defaultSettings.fixedHeader)
    /** 侧边栏配置 */
    const sidebar = reactive(defaultSettings.sidebar)
    // 侧边栏配色方案 (经典蓝/极简白)
    const sidebarColorScheme = ref(defaultSettings.sidebarColorScheme)
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
    /** 顶部菜单激活路径 */
    const activeTopMenuPath = ref('')
    // 定义 getters
    /** 当前语言环境 */
    const locale = computed(() => (language.value === 'en' ? en : zhCn))
    // 切换侧边栏
    function toggleSidebar() {
      sidebar.opened = !sidebar.opened
    }
    // 关闭侧边栏
    function closeSideBar() {
      sidebar.opened = false
    }

    // 打开侧边栏
    function openSideBar() {
      sidebar.opened = true
    }
    return {
      title,
      version,
      showSettings,
      tabsView,
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
      activeTopMenuPath,
      toggleSidebar,
      closeSideBar,
      openSideBar,
      tabsIcon,
      sidebarColorScheme,
      breadcrumb,
      breadcrumbIcon
    }
  },
  {
    persist: piniaPersistConfig('app')
  }
)

export function useAppStoreHook() {
  return useAppStore(store)
}
