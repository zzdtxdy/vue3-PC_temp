<!--
 * @Description: 导航栏
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:43
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 23:33:42
 * @FilePath: \vue3-PC_temp\src\layout\components\NavBar\index.vue
-->
<template>
  <div class="navbar">
    <div class="navbar__left">
      <!-- 展开/收缩菜单  -->
      <CollapseIcon />
      <!-- 面包屑 -->
      <Breadcrumb />
    </div>
    <!-- 导航栏右侧 -->
    <!-- <NavbarRight /> -->
  </div>
</template>

<script setup lang="ts">
import { useAppStoreHook } from '@/stores/modules/app'
import CollapseIcon from './components/CollapseIcon.vue'
import Breadcrumb from './components/Breadcrumb.vue'
</script>

<style lang="scss" scoped>
.navbar {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: $navbar-height;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  &__left {
    display: flex;
    align-items: center;
  }
}
</style>
