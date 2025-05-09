<!--
 * @Description: 图标组件
 * @Author: zhongzd
 * @Date: 2025-05-02 21:43:02
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 12:22:29
 * @FilePath: \vue3-PC_temp\src\components\MenuIcon\index.vue
-->
<!-- filepath: c:\Users\zzd\Desktop\项目\vue3-PC_temp\src\layout\components\Sidebar\components\MenuIcon.vue -->
<template>
  <el-icon v-if="icon?.startsWith('el-icon')" class="sub-el-icon" :style="`font-size: ${width}`">
    <component :is="icon.replace('el-icon-', '')" />
  </el-icon>
  <svg-icon v-else-if="icon" :name="icon" :size="width"   />
  <svg-icon v-else name="menu" :size="width" />
</template>

<script setup lang="ts">
const { icon } = defineProps({
  icon: {
    type: String,
    default: ''
  },
  width : {
    type: String,
    default: '18px'
  }
})
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
}
</style>
