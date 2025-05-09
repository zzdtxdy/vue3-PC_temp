<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-07-07 16:17:50
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-24 17:12:32
 * @FilePath: \vue3-PC_temp\src\App.vue
-->
<template>
  <el-config-provider :locale="locale" :size="size">
    <!-- 开启水印 -->
    <el-watermark
      v-if="watermarkEnabled"
      :font="{ color: fontColor }"
      :content="defaultSettings.watermarkContent"
      :z-index="9999"
      class="wh-full"
    >
      <router-view />
    </el-watermark>
    <!-- 关闭水印 -->
    <router-view v-else />
  </el-config-provider>
</template>

<script setup lang="ts">
import defaultSettings from '@/settings'
import { ComponentSize } from '@/enums/settings/LayoutEnum'
import { useAppStoreHook } from '@/stores/modules/app'

const appStore = useAppStoreHook()

const locale = computed(() => appStore.locale)
const size = computed(() => appStore.size as ComponentSize)
const watermarkEnabled = computed(() => appStore.watermarkEnabled)

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
  return appStore.isDark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)'
})
</script>
