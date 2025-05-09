<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:29
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 23:20:17
 * @FilePath: \vue3-PC_temp\src\layout\components\Sidebar\components\SidebarLogo.vue
-->
<template>
  <div class="logo">
    <transition name="el-fade-in-linear" mode="out-in">
      <router-link :key="+collapse" class="wh-full flex-center no-underline" to="/">
        <img :src="logo" class="w24px h24px" />
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
  box-sizing: border-box;
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;
  border-bottom: 1px solid $border-color;
  .title {
    flex-shrink: 0; /* 防止容器在空间不足时缩小 */
    margin-left: $spacing-sm;
    font-size: $font-size-h5;
    font-weight: bold;
    color: $sidebar-logo-text;
  }
}
</style>
