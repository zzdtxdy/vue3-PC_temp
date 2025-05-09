<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-07-04 19:00:40
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 12:19:59
 * @FilePath: \vue3-PC_temp\src\components\SvgIcon\index.vue
-->
<template>
  <svg aria-hidden="true" class="svg-icon" preserveAspectRatio="xMidYMid meet" :style="'width:' + size + ';height:' + size">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
   // 图标的前缀 ==> 非必传（默认为"icon"）
  prefix: {
    type: String,
    default: 'icon'
  },
  // 图标的名称 ==> 必传
  name: {
    type: String,
    required: false,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '1em'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  outline: none;
  fill: currentcolor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
}
</style>
