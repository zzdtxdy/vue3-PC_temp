/*
 * @Description: 主题
 * @Author: zhongzd
 * @Date: 2024-08-25 19:52:03
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-23 10:44:30
 * @FilePath: \vue3-PC_temp\src\hooks\useTheme.ts
 */
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import defaultSettings from '@/settings'
import { useAppStoreHook } from '@/stores/modules/app'
import { modifyAlpha } from '@/utils'

/**
 * @description 全局主题 hooks
 * */
export const useTheme = () => {
  const appStore = useAppStoreHook()
  const { isDark } = storeToRefs(appStore)

  /**
   * @description: 切换暗黑模式
   * @return {*}
   */
  const switchDark = () => {
    if (isDark.value) {
      // 在文档根元素 html上添加dark类
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // changePrimary(themeColor.value)
  }

  /**
   * @description: 修改主题颜色 null 重置
   * @param {string} newThemeColor
   * @return {*}
   */
  const changePrimary = (newThemeColor: string) => {
    if (!newThemeColor) {
      newThemeColor = defaultSettings.themeColor
      ElMessage({ type: 'success', message: `主题颜色已重置` })
    }
    const rootStyle = document.documentElement.style
    // 计算主题颜色变化
    rootStyle.setProperty(`--el-color-primary`, newThemeColor)
    rootStyle.setProperty(`--el-color-primary-dark-2`, newThemeColor)

    for (let i = 1; i < 10; i++) {
      rootStyle.setProperty(
        `--el-color-primary-light-${i}`,
        `${modifyAlpha(newThemeColor, 1 - i * 0.1)}`
      )
    }
    appStore.setGlobalState('themeColor', newThemeColor)
  }

  return {
    switchDark,
    changePrimary
  }
}
