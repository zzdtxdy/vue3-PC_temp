<!--
 * @Description: 导航栏
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:43
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-02-09 00:12:51
 * @FilePath: \vue3-PC_temp\src\layout\components\NavBar\index.vue
-->
<template>
  <div class="navbar">
    <div class="navbar__left">
      <!-- 展开/收缩菜单  -->
      <Hamburger :is-active="isSidebarOpened" @toggle-click="toggleSideBar" />
      <!-- 面包屑 -->
      <breadcrumb />
    </div>
    <!-- 导航栏右侧 -->
    <NavbarRight />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStoreHook } from '@/store/modules/global'

const appStore = useGlobalStoreHook()

// 侧边栏是否打开
const isSidebarOpened = computed(() => appStore.sidebar.opened)

// 展开/收缩菜单
function toggleSideBar() {
  appStore.toggleSidebar()
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: $navbar-height;
  background: var(--el-bg-color);
  &__left {
    display: flex;
    align-items: center;
  }
}
</style>
