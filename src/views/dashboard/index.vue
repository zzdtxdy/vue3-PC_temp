<template>
  <div class="stock-container">
    <el-card class="stock-card">
      <template #header>
        <div class="card-header">
          <span>{{ activeTabLabel }}</span>
          <el-button type="primary" size="small" @click="refreshData">刷新</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="股票" name="stock"></el-tab-pane>
        <el-tab-pane label="黄金" name="gold"></el-tab-pane>
        <el-tab-pane label="基金" name="fund"></el-tab-pane>
        <el-tab-pane label="期货" name="future"></el-tab-pane>
      </el-tabs>

      <el-scrollbar height="400px">
        <div class="data-list">
          <div v-for="item in currentList" :key="item.code" class="data-item" @click="goToDetail(item.code)">
            <div class="data-info">
              <div class="data-name">{{ item.name }}</div>
              <div class="data-code">{{ item.code }}</div>
            </div>
            <div class="data-price">
              <div class="current-price">{{ item.price }}</div>
              <div class="price-type">{{ item.type }}</div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import StockAPI from '@/api/stock'
import goldAPI from '@/api/gold'
import fundAPI from '@/api/fund'
import futureAPI from '@/api/futures'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 路由实例
const router = useRouter()

// 定义数据接口
interface DataItem {
  code: string
  name: string
  price: number | string
  type: string
}
type TabType = 'stock' | 'gold' | 'fund' | 'future'

// Tabs 激活状态
const activeTab = ref<TabType>('stock') // 当前激活的 Tab
const activeTabLabel = ref('股票列表') // 激活 Tab 的标题

// 数据列表
const stockList = ref<DataItem[]>([])
const goldList = ref<DataItem[]>([])
const fundList = ref<DataItem[]>([])
const futureList = ref<DataItem[]>([])

// 当前渲染的数据列表
const currentList = ref<DataItem[]>([])

// 切换 Tab 时更新数据
const handleTabChange = (tab: any) => {
  switch (tab) {
    case 'stock':
      activeTabLabel.value = '股票列表'
      currentList.value = stockList.value
      break
    case 'gold':
      activeTabLabel.value = '黄金列表'
      currentList.value = goldList.value
      break
    case 'fund':
      activeTabLabel.value = '基金列表'
      currentList.value = fundList.value
      break
    case 'future':
      activeTabLabel.value = '期货列表'
      currentList.value = futureList.value
      break
  }
  getDataForTab(tab)
}

// 跳转详情页
const goToDetail = (code: string) => {
  router.push({
    path: '/detail',
    query: { code, type: activeTab.value }
  })
}

// 刷新数据
const refreshData = () => {
  console.log('刷新数据', activeTab.value)
  getDataForTab(activeTab.value)
}
// 获取对应 Tab 的数据
const getDataForTab = (tab: TabType) => {
  fetchData(tab)
}

// 模拟获取数据的函数
const fetchData = async (tab: TabType) => {
  const fetchMap = {
    stock: {
      code: 'thsCode',
      name: 'stockName',
      api: StockAPI
    },
    gold: {
      code: 'goldCode',
      name: 'goldName',
      api: goldAPI
    },
    fund: {
      code: 'fundCode',
      name: 'fundName',
      api: fundAPI
    },
    future: {
      code: 'futuresCode',
      name: 'futuresName',
      api: futureAPI
    }
  }
  fetchMap[tab].api.getList().then((res: any) => {
    currentList.value = res.data.map((i: any) => ({
      code: i[fetchMap[tab].code],
      name: i[fetchMap[tab].name],
      price: i.issuePriceText,
      type: i.type == '1' ? '大盘' : '个股'
    }))
    // if (activeTab.value === 'stock') currentList.value = stockList.value
  })
}

// 页面加载时获取初始数据
onMounted(() => {
  getDataForTab(activeTab.value)
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
.data-list {
  padding: 10px;
}
.data-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}
.data-info {
  display: flex;
  flex-direction: column;
}
.data-name {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
.data-code {
  font-size: 13px;
  color: #666666;
}
.data-price {
  text-align: right;
}
.current-price {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
.price-type {
  font-size: 13px;
}
</style>
