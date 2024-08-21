import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import defaultSettings from '@/settings'
import { getLightColor, getDarkColor } from '@/utils/color'
import { useAppStore } from '@/store'
import { ThemeEnum } from '@/enums/ThemeEnum'

/**
 * @description 全局主题 hooks
 * */
export const useTheme = () => {
  const appStore = useAppStore()
  const { themeColor, theme } = storeToRefs(appStore)

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
  const switchDark = () => {
    if (theme.value === ThemeEnum.DARK) {
      // 在文档根元素 html上添加dark类
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    changePrimary(themeColor.value)
  }

  // 修改主题颜色
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY
      ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` })
    }
    // 计算主题颜色变化
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    )
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
    globalStore.setGlobalState('primary', val)
  }

  // init theme
  const initTheme = () => {
    theme.value = defaultSettings.theme
    switchDark()
  }

  return {
    initTheme,
    switchDark,
    changePrimary
  }
}
