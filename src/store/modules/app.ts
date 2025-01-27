// /*
//  * @Description: 全局配置
//  * @Author: zhongzd
//  * @Date: 2024-08-16 13:34:31
//  * @LastEditors: zhongzd
//  * @LastEditTime: 2025-01-20 16:17:42
//  * @FilePath: \vue3-PC_temp\src\store\modules\app.ts
//  */
// import { _DeepPartial, defineStore, StateTree } from 'pinia'
// import defaultSettings from '@/settings'
// import piniaPersistConfig from '@/store/persistConfig'
// // 导入 Element Plus 中英文语言包
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import en from 'element-plus/es/locale/lang/en'
// import store from '@/store'

// export const useAppStore = defineStore('app', {
//   state: (): AppSettings => {
//     const {
//       device,
//       title, // 应用标题
//       version, // 应用版本
//       layout, // 布局模式：left-左侧模式(默认) top-顶部模式 mix-混合模式
//       size, // Element UI 组件的默认大小
//       language, // 当前系统语言
//       isDark, // 主题模式（暗色或亮色）
//       themeColor, // 主题颜色
//       watermarkEnabled, // 页面水印启用状态
//       watermarkContent, // 页面水印内容
//       fixedHeader, // 是否固定头部
//       tagsView, // 是否显示多标签导航
//       sidebar // 侧边栏状态
//     } = defaultSettings
//     // 返回状态对象，包含所有初始化的状态属性
//     return {
//       device,
//       title,
//       version,
//       layout,
//       size,
//       language,
//       isDark,
//       themeColor,
//       sidebar,
//       watermarkEnabled,
//       watermarkContent,
//       fixedHeader,
//       tagsView
//     }
//   },
//   getters: {
//     /**
//      * 根据语言标识读取对应的语言包
//      */
//     locale: (state) => (state.language == 'en' ? en : zhCn)
//   },
//   actions: {
//     // Set GlobalState
//     setGlobalState<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
//       console.log(key, value)
//       this.$patch({ [key]: value } as _DeepPartial<StateTree>)
//       console.log('Updated state:', this.$state) // 打印更新后的状态
//     },
//     setGlobalStatePatch(state: Partial<AppSettings>) {
//       this.$patch(state as _DeepPartial<StateTree>)
//     }
//   },
//   persist: piniaPersistConfig('app')
// })
// /**
//  * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
//  * 官方文档解释了如何在组件外部使用 Pinia Store：
//  * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
//  */
// export function useAppStoreHook() {
//   return useAppStore(store)
// }
