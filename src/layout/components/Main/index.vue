<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-03-23 20:27:31
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-12 22:52:54
 * @FilePath: \vue3-PC_temp\src\layout\components\Main\index.vue
-->
<template>
  <section class="app-main" :style="{ height: appMainHeight }">
    <router-view>
      <template #default="{ Component, route }">
        <transition enter-active-class="animate__animated animate__fadeIn" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useAppStore, useTabsViewStore } from '@/store'
import variables from '@/styles/var.module.scss'

// 缓存页面集合
const cachedViews = computed(() => useTabsViewStore().cachedViews)
const appMainHeight = computed(() => {
  if (useAppStore().tabsView) {
    return `calc(100vh - ${variables['navbar-height']} - ${variables['tabs-view-height']})`
  } else {
    return `calc(100vh - ${variables['navbar-height']})`
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  overflow-y: auto;
  background-color: var(--el-bg-color-page);
}
</style>
