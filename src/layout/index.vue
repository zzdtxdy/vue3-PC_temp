<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-08-05 09:18:21
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-11-29 17:05:18
 * @FilePath: \vue3-PC_temp\src\layout\index.vue
-->
<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <header class="header-container flex justify-end">
      <!-- 导航栏内容 -->
      <div class="header-left">
        <!-- <span>{{ klineDate }}</span> -->
        <div class="kline-header-left">
          <el-date-picker
            v-model="klineDate"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="false"
          />
        </div>
      </div>

      <div class="header-right flex">
        <div v-if="userInfo?.username">{{ userInfo.username }}</div>
      </div>
    </header>

    <!-- 侧边栏 -->
    <aside>
      <!-- 侧边栏内容 -->
    </aside>

    <!-- 主要内容区域 -->
    <main>
      <router-view></router-view>
    </main>
    <footer class="footer-container">
      <router-link to="/dashboard" class="footer-item">
        <i class="icon-market"></i>
        <span>行情</span>
      </router-link>
      <router-link to="/order" class="footer-item">
        <i class="icon-order"></i>
        <span>委托单</span>
      </router-link>
      <router-link to="/profile" class="footer-item">
        <i class="icon-profile"></i>
        <span>个人信息</span>
      </router-link>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useStockStore } from '@/store/modules/stock'

// 获取 localStorage 中的用户信息
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')?.data
const stockStore = useStockStore()
// 读取日期
// 读取日期
const klineDate = computed({
  get: () => stockStore.klineDate,
  set: (value) => stockStore.setKlineDate(value) // 可以直接在 set 方法中更新 store
})
// 监听 klineDate 变化
// watch(klineDate, (newDate) => {
//   console.log('klineDate changed to:', newDate)
//   stockStore.setKlineDate(newDate) // 当 klineDate 变化时调用 store 更新
// })
// Add storage event listener

// const avatar = userInfo.avatar || '/src/assets/logo.png' // 获取 avatar 属性
console.log(stockStore)
</script>
<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #eeeeee;
}
.header-left {
  padding: 8px 0;
}
.header-right {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
.footer-container {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
}
.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666666;
  text-decoration: none;
}
.footer-item.router-link-active {
  color: #1890ff;
}
.footer-item i {
  margin-bottom: 2px;
  font-size: 20px;
}
</style>
