<!--
 * @Description: 暗黑模式切换
 * @Author: zhongzd
 * @Date: 2024-08-24 16:51:23
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-11 18:21:41
 * @FilePath: \vue3-PC_temp\src\components\SwitchDark\index.vue
-->
<template>
  <el-switch v-model="appStore.isDark" inline-prompt active-icon="Sunny" inactive-icon="Moon" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
const { switchDark } = useTheme()
watchEffect(switchDark)
</script>
