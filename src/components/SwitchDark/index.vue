<!--
 * @Description: 暗黑模式切换
 * @Author: zhongzd
 * @Date: 2024-08-24 16:51:23
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-10-01 18:19:44
 * @FilePath: \vue3-PC_temp\src\components\SwitchDark\index.vue
-->
<template>
  <el-switch v-model="globalStore.isDark" inline-prompt active-icon="Moon" inactive-icon="Sunny" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore } from '@/store/modules/global'
const globalStore = useGlobalStore()
// const isDark = computed(() => globalStore.isDark)
const { switchDark } = useTheme()
watchEffect(switchDark)
// onMounted(() => {
//   switchDark()
// })
</script>
