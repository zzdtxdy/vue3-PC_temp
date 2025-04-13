<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:29
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-13 23:02:03
 * @FilePath: \vue3-PC_temp\src\layout\components\Sidebar\components\SidebarLogo.vue
-->
<template>
  <div class="logo">
    <transition name="el-fade-in-linear" mode="out-in">
      <router-link :key="+collapse" class="wh-full flex-center no-underline" to="/">
        <img :src="logo" class="w20px h20px" />
        <span v-if="!collapse" class="title">
          {{ defaultSettings.title }}
        </span>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import defaultSettings from '@/settings'
import logo from '@/assets/logo.png'

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  border-bottom: 1px solid $border-color;
  .title {
    flex-shrink: 0; /* 防止容器在空间不足时缩小 */
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: $sidebar-logo-text;
  }
}
.layout-top,
.layout-mix {
  .logo {
    width: $sidebar-width;
  }
  &.hideSidebar {
    .logo {
      width: $sidebar-width-collapsed;
    }
  }
}
</style>
