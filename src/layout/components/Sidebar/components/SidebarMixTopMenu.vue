<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-01-20 17:17:49
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-02-08 21:05:06
 * @FilePath: \vue3-PC_temp\src\layout\Sidebar\components\SidebarMixTopMenu.vue
-->
<!-- 混合布局顶部菜单 -->
<template>
  <el-scrollbar>
    <el-menu
      mode="horizontal"
      :default-active="activePath"
      :background-color="variables['menu-background']"
      :text-color="variables['menu-text']"
      :active-text-color="variables['menu-active-text']"
      @select="handleMenuSelect"
    >
      <el-menu-item v-for="route in topMenus" :key="route.path" :index="route.path">
        <template #title>
          <template v-if="route.meta && route.meta.icon">
            <el-icon v-if="route.meta.icon.startsWith('el-icon')" class="sub-el-icon">
              <component :is="route.meta.icon.replace('el-icon-', '')" />
            </el-icon>
            <svg-icon v-else :icon-class="route.meta.icon" />
          </template>
          <span v-if="route.path === '/'">首页</span>
          <span v-else-if="route.meta && route.meta.title" class="ml-1">
            {{ translateRouteTitle(route.meta.title) }}
          </span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
/**
 * 导入模块：先外部库，再内部模块，最后导入样式和工具类
 */
import { LocationQueryRaw, RouteRecordRaw } from 'vue-router'
import { useAuthStore, useGlobalStoreHook } from '@/store'
import { translateRouteTitle } from '@/utils/i18n'
import variables from '@/styles/variables.module.scss'
import { isObject } from 'radash'

/**
 * 定义状态：先定义 reactive、ref 或 computed 状态
 */
const router = useRouter()
const globalStore = useGlobalStoreHook()
const authStore = useAuthStore()

// 当前激活的顶部菜单路径
const activePath = computed(() => globalStore.activeTopMenuPath)

// 顶部菜单列表
const topMenus = ref<RouteRecordRaw[]>([])

// 获取当前路由路径的顶部菜单路径
const activeTopMenuPath =
  useRoute().path.split('/').filter(Boolean).length > 1
    ? useRoute().path.match(/^\/[^/]+/)?.[0] || '/'
    : '/'

// 设置当前激活的顶部菜单路径
globalStore.activeTopMenu(activeTopMenuPath)

/**
 * 处理菜单点击事件，切换顶部菜单并加载对应的左侧菜单
 * @param routePath 点击的菜单路径
 */
const handleMenuSelect = (routePath: string) => {
  globalStore.activeTopMenu(routePath) // 设置激活的顶部菜单
  authStore.setMixedLayoutLeftRoutes(routePath) // 更新左侧菜单
  navigateToFirstLeftMenu(authStore.mixedLayoutLeftRoutes as RouteRecordRaw[]) // 跳转到左侧第一个菜单
}

/**
 * 跳转到左侧第一个可访问的菜单
 * @param menus 左侧菜单列表
 */
const navigateToFirstLeftMenu = (menus: RouteRecordRaw[]) => {
  if (menus.length === 0) return

  const [firstMenu] = menus
  // 如果有子菜单，则递归查找第一个可访问的子菜单
  if (firstMenu.children && firstMenu.children.length > 0) {
    navigateToFirstLeftMenu(firstMenu.children)
    // 如果子菜单都不可访问，则跳转到第一个可访问的菜单
  } else if (firstMenu.name) {
    const params: { name: string | symbol; query?: LocationQueryRaw } = {
      name: firstMenu.name
    }
    if (isObject(firstMenu.meta?.params)) {
      params.query = firstMenu.meta.params as LocationQueryRaw
    }
    router.push(params)
  }
}

onMounted(() => {
  topMenus.value = authStore.routes.filter((item) => !item.meta || !item.meta.hidden)
})
</script>
