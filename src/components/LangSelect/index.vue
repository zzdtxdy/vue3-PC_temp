<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-08-25 19:52:03
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-02-09 11:52:52
 * @FilePath: \vue3-PC_temp\src\components\LangSelect\index.vue
-->
<template>
  <el-dropdown trigger="click" @command="handleLanguageChange">
    <div>
      <svg-icon name="language" :size="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :disabled="globalStore.language === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStoreHook } from '@/stores/modules/app'
import { LanguageEnum } from '@/enums/settings/LanguageEnum'
import { LanguageType } from '@/stores/interface'
const emit = defineEmits(['resetForm'])
const { size } = defineProps({
  size: {
    type: String,
    default: '20'
  }
})

const langOptions = [
  { label: '中文', value: LanguageEnum.ZH_CN },
  { label: 'English', value: LanguageEnum.EN }
]

const globalStore = useAppStoreHook()
const { locale, t } = useI18n()
// 在组件加载时自动设置语言
onMounted(() => {
  const currentLang = globalStore.language
  handleLanguageChange(currentLang, false)
})
function handleLanguageChange(lang: LanguageType, showMessage = true) {
  locale.value = lang
  globalStore.setGlobalState('language', lang)
  if (showMessage) {
    ElMessage.success(t('langSelect.message.success'))
  }
  setTimeout(() => {
    emit('resetForm')
  })
}
</script>
