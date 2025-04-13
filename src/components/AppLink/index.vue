<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-03-24 21:36:09
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-06 16:00:59
 * @FilePath: \vue3-PC_temp\src\components\AppLink\index.vue
-->
<template>
  <component :is="linkType" v-bind="linkProps(to)" class="no-underline">
    <slot />
  </component>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppLink'
})

import { isExternal } from '@/utils/index'

const props = defineProps({
  to: {
    type: Object,
    required: true
  }
})

const isExternalLink = computed(() => {
  return isExternal(props.to.path || '')
})

const linkType = computed(() => (isExternalLink.value ? 'a' : 'router-link'))

const linkProps = (to: any) => {
  if (isExternalLink.value) {
    return {
      href: to.path,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  return { to: to }
}
</script>
