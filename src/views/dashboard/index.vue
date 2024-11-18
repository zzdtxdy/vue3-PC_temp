<template>
  <div class="stock-container">
    <el-card class="stock-card">
      <template #header>
        <div class="card-header">
          <span>股票列表</span>
          <el-button type="primary" size="small" @click="refreshStockData">刷新</el-button>
        </div>
      </template>

      <el-scrollbar height="400px">
        <div class="stock-list">
          <div v-for="stock in stockList" :key="stock.code" class="stock-item" @click="goToDetail(stock.code)">
            <div class="stock-info">
              <div class="stock-name">{{ stock.name }}</div>
              <div class="stock-code">{{ stock.code }}</div>
            </div>
            <div class="stock-price">
              <div class="current-price">{{ stock.price }}</div>
              <div class="price-change">{{ stock.type }}</div>
            </div>
            <!-- <div class="stock-price" :class="{ 'price-up': stock.change > 0, 'price-down': stock.change < 0 }">
              <div class="current-price">{{ stock.price }}</div>
              <div class="price-change">{{ stock.change }}%</div>
            </div> -->
          </div>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import StockAPI from '@/api/stock'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // 添加这行

const router = useRouter() // 添加这行
// 股票数据接口
interface StockItem {
  code: string
  name: string
  price: number
  change?: number
  type: string
}

// 模拟数据
const stockList = ref<StockItem[]>([
  // { code: 'SH600519', name: '贵州茅台', price: 1800.5, change: 2.31 },
])

// 添加跳转方法
const goToDetail = (code: string) => {
  router.push({
    path: '/stock/detail',
    query: { code }
  })
}
const refreshStockData = () => {
  // 这里添加刷新数据的逻辑
  console.log('刷新数据')
  getStockList()
}
const getStockList = () => {
  // 页面加载时的初始化逻辑
  StockAPI.stockList().then((res) => {
    console.log(res)
    stockList.value = res.data.map((i: any) => {
      return {
        code: i.thscode,
        name: i.stockName,
        price: i.issuePriceText,
        type: i.type == '1' ? '大盘' : '个股'
      }
    })
  })
}
onMounted(() => {
  getStockList()
})
</script>

<style scoped>
.stock-container {
  padding: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stock-list {
  padding: 10px;
}
.stock-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}
.stock-info {
  display: flex;
  flex-direction: column;
}
.stock-name {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
.stock-code {
  font-size: 13px;
  color: #666666;
}
.stock-price {
  text-align: right;
}
.current-price {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
.price-change {
  font-size: 13px;
}
.price-up {
  color: #f56c6c;
}
.price-down {
  color: #67c23a;
}
</style>
