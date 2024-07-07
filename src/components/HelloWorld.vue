<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-07-06 21:04:59
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-07-07 18:25:32
 * @FilePath: \项目\vue3-PC_temp\src\components\HelloWorld.vue
-->
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>
      +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
      . What's next?
    </h3>
  </div>
</template>

<style scoped lang="scss">
h1 {
  position: relative;
  top: -10px;
  width: 100px;
  font-size: 2.6rem;
  font-weight: 500;
}
h3 {
  font-size: 1.2rem;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (width >= 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
