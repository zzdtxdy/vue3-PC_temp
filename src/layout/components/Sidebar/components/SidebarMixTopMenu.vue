<!-- 混合布局顶部菜单 -->
<template>
  <el-scrollbar>
    <el-menu
      mode="horizontal"
      :default-active="activePath"
      :background-color="menuBackgroundColor"
      :text-color="menuTextColor"
      :active-text-color="menuActiveTextColor"
      @select="handleMenuSelect"
    >
      <el-menu-item v-for="route in topMenus" :key="route.path" :index="route.path">
        <template #title>
          <el-icon
            v-if="route.meta?.icon && String(route.meta.icon).startsWith('el-icon')"
            class="sub-el-icon"
          >
            <component :is="String(route.meta.icon).replace('el-icon-', '')" />
          </el-icon>
          <div v-else-if="route.meta?.icon" :class="`i-svg:${route.meta.icon}`" />
          <span v-if="route.path === '/'">首页</span>
          <span v-else-if="route.meta?.title" class="ml-1">
            {{ translateRouteTitle(route.meta.title) }}
          </span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute, LocationQueryRaw } from 'vue-router'
import { useAuthStore, useAppStore } from '@/stores'
import { translateRouteTitle } from '@/utils/i18n'
import variables from '@/styles/var.module.scss'
import { SidebarColor, ThemeMode } from '@/enums/settings/ThemeEnum'

const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

// 当前激活的顶部菜单路径
const activePath = computed(() => appStore.activeTopMenuPath)

// 动态获取菜单样式
const menuBackgroundColor = computed(() =>
  appStore.isDark || appStore.sidebarColorScheme === SidebarColor.CLASSIC_BLUE
    ? variables['menu-background']
    : undefined
)
const menuTextColor = computed(() =>
  appStore.isDark || appStore.sidebarColorScheme === SidebarColor.CLASSIC_BLUE
    ? variables['menu-text']
    : undefined
)
const menuActiveTextColor = computed(() =>
  appStore.isDark || appStore.sidebarColorScheme === SidebarColor.CLASSIC_BLUE
    ? variables['menu-active-text']
    : undefined
)

// 顶部菜单列表
const topMenus = ref<Menu.RouteVO[]>([])

// 初始化顶部菜单路径
/* 
目标：提取当前路径的顶级部分，用于激活顶部菜单。
逻辑：如果路径包含多级（如 /dashboard/analytics），提取顶级路径（如 /dashboard）。
如果路径是一级或根路径（如 / 或 /dashboard），直接返回 '/' */
const initializeActiveTopMenuPath = () => {
  const currentPath = useRoute().path
  const activeTopMenuPath =
    currentPath.split('/').filter(Boolean).length > 1
      ? currentPath.match(/^\/[^/]+/)?.[0] || '/'
      : '/'
  appStore.activeTopMenuPath = activeTopMenuPath
}

// 处理菜单点击事件
const handleMenuSelect = (routePath: string) => {
  appStore.activeTopMenuPath = routePath // 设置激活的顶部菜单
  authStore.setMixLeftMenuList(routePath) // 更新左侧菜单
  navigateToFirstLeftMenu(authStore.mixLeftMenuList) // 跳转到左侧第一个菜单
}

// 跳转到左侧第一个可访问的菜单
const navigateToFirstLeftMenu = (menus: Menu.RouteVO[]) => {
  for (const menu of menus) {
    // 如果当前菜单有子菜单，递归处理第一个子菜单
    if (menu.children && menu.children.length > 0) {
      navigateToFirstLeftMenu(menu.children)
      return
      // 如果当前菜单是叶子节点，跳转到该菜单
    } else if (menu.name) {
      router.push({
        name: menu.name,
        query:
          typeof menu.meta?.params === 'object'
            ? (menu.meta.params as unknown as LocationQueryRaw)
            : undefined
      })
      return
    }
  }
}

// 初始化顶部菜单
onMounted(() => {
  topMenus.value = authStore.authMenuList.filter((item) => !item.meta?.isHide)
  initializeActiveTopMenuPath()
})
</script>
