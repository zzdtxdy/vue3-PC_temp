<!--
 * @Description: 暗黑模式切换
 * @Author: zhongzd
 * @Date: 2024-08-24 16:51:23
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 17:42:10
 * @FilePath: \vue3-PC_temp\src\components\SwitchDark\index.vue
-->
<template>
  <el-switch v-model="appStore.theme" inline-prompt active-icon="Sunny" inactive-icon="Moon" @change="switchDark" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store/modules/app'

const { switchDark } = useTheme()
const appStore = useAppStore()
</script>
