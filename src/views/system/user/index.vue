<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-03-29 11:42:18
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-29 11:42:25
 * @FilePath: \vue3-PC_temp\src\views\system\user\index.vue
-->
<template>
  <div>11111</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, onMounted, getCurrentInstance } from 'vue'

const emit = defineEmits([''])
const props = defineProps({
  propData: {
    type: String,
    default: ''
  }
})
//const { } = toRefs(props);

const { data } = toRefs(
  reactive({
    //定义数组和对象
    data: ''
  })
)
</script>
