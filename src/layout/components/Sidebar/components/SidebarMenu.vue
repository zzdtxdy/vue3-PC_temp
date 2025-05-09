<!--
 * @Description: 侧边栏菜单
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:29
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-02 21:21:18
 * @FilePath: \vue3-PC_temp\src\layout\components\Sidebar\components\SidebarMenu.vue
-->
<template>
  <!-- 菜单组件 -->
  <el-menu
    ref="menuRef"
    :router="false"
    :default-active="currentRoute.path"
    :collapse="!appStore.sidebar.opened"
    :background-color="menuBackgroundColor"
    :text-color="menuTextColor"
    :active-text-color="menuActiveTextColor"
    :popper-effect="theme"
    :unique-opened="false"
    :collapse-transition="false"
    :mode="menuMode"
    @open="onMenuOpen"
    @close="onMenuClose"
  >
    <!-- 菜单项 -->
    <SidebarMenuItem v-for="route in menuList" :key="route.path" :menuItem="route" />
  </el-menu>
</template>

<script lang="ts" setup>
import type { MenuInstance } from 'element-plus'

import SidebarMenuItem from './SidebarMenuItem.vue'
import { LayoutEnum } from '@/enums/settings/LayoutEnum'
import { SidebarColor, ThemeMode } from '@/enums/settings/ThemeEnum'
import { useAppStore } from '@/stores'

import variables from '@/styles/var.module.scss'

const props = defineProps({
  menuList: {
    type: Array<Menu.RouteVO>,
    default: () => []
  }
})

const menuRef = ref<MenuInstance>()
const appStore = useAppStore()
const currentRoute = useRoute()

// 存储已展开的菜单项索引
const expandedMenuIndexes = ref<string[]>([])

// 动态计算菜单模式：顶部布局使用水平模式，其他使用垂直模式
const menuMode = computed(() => (appStore.layout === LayoutEnum.TOP ? 'horizontal' : 'vertical'))

// 动态获取主题
const theme = computed(() => (appStore.isDark ? ThemeMode.DARK : ThemeMode.LIGHT))

// 动态获取菜单样式
const menuBackgroundColor = computed(() =>
  theme.value === ThemeMode.DARK ? variables['menu-background'] : undefined
)
const menuTextColor = computed(() =>
  theme.value === ThemeMode.DARK ? variables['menu-text'] : undefined
)
const menuActiveTextColor = computed(() =>
  theme.value === ThemeMode.DARK ? variables['menu-active-text'] : undefined
)

/**
 * 打开菜单
 *
 * @param index 当前展开的菜单项索引
 */
const onMenuOpen = (index: string) => {
  if (!expandedMenuIndexes.value.includes(index)) {
    expandedMenuIndexes.value.push(index)
  }
}

/**
 * 关闭菜单
 *
 * @param index 当前收起的菜单项索引
 */
const onMenuClose = (index: string) => {
  expandedMenuIndexes.value = expandedMenuIndexes.value.filter((item) => item !== index)
}

/**
 * 监听菜单模式变化：当菜单模式切换为水平模式时，关闭所有展开的菜单项，
 * 避免在水平模式下菜单项显示错位。
 */
watch(
  () => menuMode.value,
  (newMode) => {
    if (newMode === 'horizontal') {
      expandedMenuIndexes.value.forEach((item) => menuRef.value?.close(item))
      expandedMenuIndexes.value = []
    }
  }
)
</script>
<style lang="scss" scoped>
.el-menu {
  width: 100%;
}
</style>
