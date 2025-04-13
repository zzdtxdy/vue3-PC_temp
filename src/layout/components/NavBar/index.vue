<!--
 * @Description: 导航栏
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:43
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-13 13:41:46
 * @FilePath: \vue3-PC_temp\src\layout\components\NavBar\index.vue
-->
<template>
  <div class="navbar">
    <div class="navbar__left">
      <!-- 展开/收缩菜单  -->
      <CollapseIcon/>
      <!-- 面包屑 -->
      <breadcrumb />
    </div>
    <!-- 导航栏右侧 -->
    <!-- <NavbarRight /> -->
  </div>
</template>

<script setup lang="ts">
import { useAppStoreHook } from '@/store/modules/app'
import CollapseIcon from './components/CollapseIcon.vue';
const appStore = useAppStoreHook()

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
