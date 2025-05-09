<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-04-13 13:38:04
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-13 13:43:11
 * @FilePath: \vue3-PC_temp\src\layout\components\NavBar\components\CollapseIcon.vue
-->
<template>
  <el-icon class="collapse-icon" @click="appStore.toggleSidebar">
    <component :is="appStore.sidebar.opened ? 'fold' : 'expand'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app";

const appStore = useAppStore();
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
