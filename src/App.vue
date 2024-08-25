<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-07-07 16:17:50
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 17:37:41
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
import { useAppStore } from '@/store/modules/app'
import defaultSettings from '@/settings'
import { ThemeEnum } from '@/enums/ThemeEnum'
import { SizeEnum } from '@/enums/SizeEnum'

const appStore = useAppStore()

const locale = computed(() => appStore.locale)
const size = computed(() => appStore.size as SizeEnum)
const watermarkEnabled = computed(() => appStore.watermarkEnabled)

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
  return appStore.theme === ThemeEnum.DARK ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)'
})
</script>
