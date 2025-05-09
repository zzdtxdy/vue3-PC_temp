<!--
 * @Description: 侧边栏
 * @Author: zhongzd
 * @Date: 2025-01-09 10:09:39
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-26 18:34:30
 * @FilePath: \vue3-PC_temp\src\layout\components\Sidebar\index.vue
-->
<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <!-- 混合布局顶部  -->
    <div v-if="isMixLayout" class="flex w-full">
      <SidebarLogo v-if="sidebarLogo" :collapse="isSidebarCollapsed" />
      <!-- 混合布局左侧菜单 -->
      <SidebarMixTopMenu class="flex-1" />
      <NavbarRight />
    </div>

    <!-- 顶部布局顶部 || 左侧布局左侧 -->
    <template v-else>
      <SidebarLogo v-if="sidebarLogo" :collapse="isSidebarCollapsed" />
      <el-scrollbar>
        <!-- 左侧布局左侧菜单 -->
        <SidebarMenu :menuList="authStore.authMenuList" />
      </el-scrollbar>

      <!-- 顶部布局导航 -->
      <NavbarRight v-if="isTopLayout" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { LayoutEnum } from '@/enums/settings/LayoutEnum'
import { useAppStore, useAuthStore } from '@/stores'
import SidebarLogo from './components/SidebarLogo.vue'
import SidebarMixTopMenu from './components/SidebarMixTopMenu.vue'
import SidebarMenu from './components/SidebarMenu.vue'

import NavbarRight from '../NavBar/components/NavbarRight.vue'

const appStore = useAppStore()
const authStore = useAuthStore()

const sidebarLogo = computed(() => appStore.sidebar.isLogo)
const layout = computed(() => appStore.layout)

const isMixLayout = computed(() => layout.value === LayoutEnum.MIX)
const isTopLayout = computed(() => layout.value === LayoutEnum.TOP)
const isSidebarCollapsed = computed(() => !appStore.sidebar.opened)
</script>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>
