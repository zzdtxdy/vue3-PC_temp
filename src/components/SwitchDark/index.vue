<!--
 * @Description: 暗黑模式切换
 * @Author: zhongzd
 * @Date: 2024-08-24 16:51:23
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-23 10:40:11
 * @FilePath: \vue3-PC_temp\src\components\SwitchDark\index.vue
-->
<template>
  <el-switch v-model="globalStore.isDark" inline-prompt active-icon="Sunny" inactive-icon="Moon" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme'
import { useAppStoreHook } from '@/store/modules/app'
const globalStore = useAppStoreHook()
const { switchDark } = useTheme()
watchEffect(switchDark)
</script>
