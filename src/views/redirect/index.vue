<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-07-29 17:32:20
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-07-29 17:32:35
 * @FilePath: \zzd\vue3-PC_temp\src\views\redirect\index.vue
-->
<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { params, query } = route
const { path } = params

router.replace({ path: '/' + path, query })
</script>
