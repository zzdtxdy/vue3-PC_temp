/*
 * @Description: 全局配置
 * @Author: zhongzd
 * @Date: 2024-08-16 13:34:31
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 17:43:21
 * @FilePath: \vue3-PC_temp\src\store\modules\app.ts
 */
import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import piniaPersistConfig from '@/store/persistConfig'
// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import store from '@/store'

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppSettings => {
    const {
      device,
      title, // 应用标题
      version, // 应用版本
      layout, // 布局模式：left-左侧模式(默认) top-顶部模式 mix-混合模式
      size, // Element UI 组件的默认大小
      language, // 当前系统语言
      theme, // 主题模式（暗色或亮色）
      themeColor, // 主题颜色
      sidebarStatus, // 菜单栏状态 是否折叠菜单
      watermarkEnabled, // 页面水印启用状态
      watermarkContent, // 页面水印内容
      fixedHeader, // 是否固定头部
      tagsView, // 是否显示多标签导航
      sidebarLogo, // 是否显示侧边栏Logo
      breadcrumb, // 面包屑导航
      breadcrumbIcon, // 面包屑导航图标
      tabs, // 标签页
      tabsIcon, // 标签页图标
      activeTopMenuPath // 顶部菜单激活路径
    } = defaultSettings
    // 返回状态对象，包含所有初始化的状态属性
    return {
      device,
      title,
      version,
      layout,
      size,
      language,
      theme,
      themeColor,
      sidebarStatus,
      watermarkEnabled,
      watermarkContent,
      fixedHeader,
      tagsView,
      sidebarLogo,
      breadcrumb,
      breadcrumbIcon,
      tabs,
      tabsIcon,
      activeTopMenuPath
    }
  },
  getters: {
    /**
     * 根据语言标识读取对应的语言包
     */
    locale: (state) => (state.language == 'en' ? en : zhCn)
  },
  actions: {
    // Set GlobalState
    setGlobalState<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
      this.$patch({ [key]: value })
    }
  },
  persist: piniaPersistConfig('global')
})
/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useAppStoreHook() {
  return useAppStore(store)
}
