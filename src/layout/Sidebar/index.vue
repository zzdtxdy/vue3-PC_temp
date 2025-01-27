<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-01-09 10:09:39
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-20 16:48:23
 * @FilePath: \vue3-PC_temp\src\layout\index.vue
-->
<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <!-- 混合布局顶部  -->
    <div v-if="isMixLayout" class="flex w-full">
      <SidebarLogo v-if="sidebarLogo" :collapse="isSidebarCollapsed" />
      <SidebarMixTopMenu class="flex-1" />
      <NavbarRight />
    </div>

    <!-- 顶部布局顶部 || 左侧布局左侧 -->
    <template v-else>
      <SidebarLogo v-if="sidebarLogo" :collapse="isSidebarCollapsed" />
      <el-scrollbar>
        <SidebarMenu :menu-list="authStore.routes" base-path="" />
      </el-scrollbar>

      <!-- 顶部布局导航 -->
      <NavbarRight v-if="isTopLayout" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { LayoutEnum } from '@/enums/LayoutEnum'
import { useGlobalStore, useAuthStore } from '@/store'

import NavbarRight from '../NavBar/components/NavbarRight.vue'

const globalStore = useGlobalStore()
const authStore = useAuthStore()

const sidebarLogo = computed(() => globalStore.sidebar.logo)
const layout = computed(() => globalStore.layout)

const isMixLayout = computed(() => layout.value === LayoutEnum.MIX)
const isTopLayout = computed(() => layout.value === LayoutEnum.TOP)
const isSidebarCollapsed = computed(() => !globalStore.sidebar.isOpen)
</script>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>
