<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-12-02 16:19:02
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-12-04 10:14:48
 * @FilePath: \vue3-PC_temp\src\views\profile\index.vue
-->
<template>
  <div class="profile-container">
    <!-- 用户信息卡片 -->
    <el-card class="user-info-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
        <el-descriptions-item label="账户余额">{{ userInfo.balance }} 元</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 持仓列表卡片 -->
    <el-card class="order-list-card">
      <template #header>
        <div class="card-header">
          <span>持仓信息</span>
        </div>
      </template>
      <el-tabs>
        <el-tab-pane label="股票持仓">
          <div class="hold-list">
            <el-card v-for="item in userInfo.userHold.stockHold" :key="item.id" class="hold-item">
              <div class="hold-info">
                <span class="market-id">{{ item.stockId }}</span>
                <span class="holding-num">持仓数量：{{ item.holdingNum }}</span>
                <span class="close-price">收盘价：{{ item.closePrice?.toFixed(2) }} 元</span>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <el-tab-pane label="黄金持仓">
          <div class="hold-list">
            <el-card v-for="item in userInfo.userHold.goldHold" :key="item.id" class="hold-item">
              <div class="hold-info">
                <span class="market-id">{{ item.goldId }}</span>
                <span class="holding-num">持仓数量：{{ item.holdingNum }}</span>
                <span class="close-price">收盘价：{{ item.closePrice?.toFixed(2) }} 元</span>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <el-tab-pane label="基金持仓">
          <div class="hold-list">
            <el-card v-for="item in userInfo.userHold.fundHold" :key="item.id" class="hold-item">
              <div class="hold-info">
                <span class="market-id">{{ item.fundId }}</span>
                <span class="holding-num">持仓数量：{{ item.holdingNum }}</span>
                <span class="close-price">收盘价：{{ item.closePrice?.toFixed(2) }} 元</span>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <el-tab-pane label="期货持仓">
          <div class="hold-list">
            <el-card v-for="item in userInfo.userHold.futuresHold" :key="item.id" class="hold-item">
              <div class="hold-info">
                <span class="market-id">{{ item.futuresId }}</span>
                <span class="holding-num">持仓数量：{{ item.holdingNum }}</span>
                <span class="close-price">收盘价：{{ item.closePrice?.toFixed(2) }} 元</span>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 订单列表卡片 -->
    <el-card class="order-list-card">
      <template #header>
        <div class="card-header">
          <span>交易记录</span>
        </div>
      </template>
      <div class="order-list">
        <el-card v-for="order in userInfo.userTradeOrder" :key="order.id" class="order-card">
          <div class="order-info">
            <div class="order-header">
              <el-tag :type="order.dealFlag === 0 ? 'success' : 'danger'" class="deal-tag">
                {{ order.dealFlag === 0 ? '买入' : '卖出' }}
              </el-tag>
              <span class="market-id">{{ order.marketId }}</span>
              <span class="order-time">{{ formatTime(order.createTime) }}</span>
            </div>
            <div class="order-details">
              <div class="detail-item">
                <span class="label">委托类型：</span>
                <span>{{ getEntrustTypeText(order.entrustType) }}</span>
              </div>
              <div class="detail-item">
                <span class="label">交易数量：</span>
                <span>{{ order.transAmount }}</span>
              </div>
              <div class="detail-item">
                <span class="label">交易价格：</span>
                <span>{{ order.transPrice }} 元</span>
              </div>
              <div class="detail-item">
                <span class="label">交易税：</span>
                <span>{{ order.transTax }} 元</span>
              </div>
              <div class="detail-item">
                <span class="label">交易时间：</span>
                <span>{{ formatTime(order.transTime) }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
    <!-- 委托列表卡片 -->
    <el-card class="order-list-card">
      <template #header>
        <div class="card-header">
          <span>委托记录</span>
        </div>
      </template>
      <div class="order-list">
        <el-card v-for="entrust in userInfo.userEntrust" :key="entrust.id" class="order-card">
          <div class="order-info">
            <div class="order-header">
              <el-tag :type="entrust.dealFlag === 0 ? 'success' : 'danger'" class="deal-tag">
                {{ entrust.dealFlag === 0 ? '买入' : '卖出' }}
              </el-tag>
              <span class="market-id">{{ entrust.marketId }}</span>
              <span class="order-time">{{ formatTime(entrust.createTime) }}</span>
            </div>
            <div class="order-details">
              <div class="detail-item">
                <span class="label">委托类型：</span>
                <span>{{ getEntrustTypeText(entrust.entrustType) }}</span>
              </div>
              <div class="detail-item">
                <span class="label">交易数量：</span>
                <span>{{ entrust.transAmount }}</span>
              </div>
              <div class="detail-item">
                <span class="label">剩余数量：</span>
                <span>{{ entrust.remainTransAmount }}</span>
              </div>
              <div class="detail-item">
                <span class="label">交易价格：</span>
                <span>{{ entrust.transPrice }} 元</span>
              </div>
              <div class="detail-item">
                <span class="label">交易税：</span>
                <span>{{ entrust.transTax }} 元</span>
              </div>
              <div class="detail-item">
                <span class="label">交易时间：</span>
                <span>{{ formatTime(entrust.transTime) }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userAPI from '@/api/user'
import router from '@/router'
import dayjs from 'dayjs'
import StockAPI from '@/api/stock'
import tradeAPI from '@/api/trade'
import goldAPI from '@/api/gold'
import fundAPI from '@/api/fund'
import futuresAPI from '@/api/futures'
import { useStockStore } from '@/store/modules/stock'

const userId = JSON.parse(localStorage.getItem('userInfo') || '{}').data?.id
interface UserTradeOrder {
  createTime: string
  dealFlag: number
  entrustType: string
  id: string
  marketId: string
  remainTransAmount: number
  stockOrderId: string
  transAmount: number
  transPrice: number
  transTax: number
  transTime: string
  updateTime: string
  userId: string
}
interface UserEntrust {
  id: string
  userId: string
  marketId: string
  dealFlag: number
  entrustType: string
  transAmount: number
  transPrice: number
  transTax: number
  transTime: string
  remainTransAmount: number // 添加剩余可交易数量字段
  createTime: string
  updateTime: string
}
// 首先添加接口定义
interface HoldItem {
  id: string
  userId: string
  holdingNum: number
  [key: string]: any // 用于适配不同类型的 id (marketId/goldId/fundId/futuresId)
  closePrice?: number // 添加收盘价字段
}
const stockStore = useStockStore()
const klineDate = computed(() => stockStore.klineDate)

interface UserHold {
  stockHold: HoldItem[]
  goldHold: HoldItem[]
  fundHold: HoldItem[]
  futuresHold: HoldItem[]
}
const userInfo = ref({
  username: '',
  balance: 0,
  userTradeOrder: [] as UserTradeOrder[],
  userEntrust: [] as UserEntrust[], // 添加这行
  userHold: {} as UserHold
})
// 获取委托类型文本
const getEntrustTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    stock: '股票',
    gold: '黄金',
    future: '期货',
    fund: '基金'
  }
  return typeMap[type] || type
}
// 添加时间格式化函数
const formatTime = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
const fetchMap = {
  stockHold: {
    api: StockAPI,
    name: '股票'
  },
  goldHold: {
    api: goldAPI,
    name: '黄金'
  },
  fundHold: {
    api: fundAPI,
    name: '期货'
  },
  futuresHold: {
    api: futuresAPI,
    name: '基金'
  }
}
// 获取某个日期的收盘价
const getClosePriceByDate = (klineData: any[], date: string) => {
  const targetData = klineData.find((item) => item.timeDay === date)
  return targetData?.closeDay || 0
}
// 获取日K数据并更新收盘价
const updateHoldingsPrice = async () => {
  if (!userInfo.value.userHold) return

  //处理股票持仓
  for (const item of userInfo.value.userHold.stockHold) {
    try {
      const res = await StockAPI.dayLine(item.stockId)
      item.closePrice = getClosePriceByDate(res.data, klineDate.value)
    } catch (error) {
      console.error('获取股票日K失败:', error)
    }
  }

  // 处理黄金持仓
  for (const item of userInfo.value.userHold.goldHold) {
    try {
      const res = await goldAPI.dayLine(item.goldId)
      item.closePrice = getClosePriceByDate(res.data, klineDate.value)
    } catch (error) {
      console.error('获取黄金日K失败:', error)
    }
  }

  // 处理基金持仓
  for (const item of userInfo.value.userHold.fundHold) {
    try {
      const res = await fundAPI.dayLine(item.fundId)
      item.closePrice = getClosePriceByDate(res.data, klineDate.value)
    } catch (error) {
      console.error('获取基金日K失败:', error)
    }
  }

  // 处理期货持仓
  for (const item of userInfo.value.userHold.futuresHold) {
    try {
      const res = await futuresAPI.dayLine(item.futuresId)
      item.closePrice = getClosePriceByDate(res.data, klineDate.value)
    } catch (error) {
      console.error('获取期货日K失败:', error)
    }
  }
}
// 监听日期变化
// watch(
//   klineDate,
//   () => {
//     updateHoldingsPrice()
//   },
//   {
//     immediate: true
//   }
// )
// // 获取股票 日k
// const fetchDayLine = async (stockType, stockCode) => {
//   try {
//     const dayLine = await fetchMap[stockType].api.dayLine(stockCode)
//     console.log(dayLine)
//     kLineData = []
//     dayLine.data.forEach((i: any) => {
//       kLineData.push([
//         i.timeDay, // 日期
//         Number(i.closeDay) // 收盘价
//       ])
//     })
//     console.log(1111, kLineData)
//     if (!klineDate.value || !kLineData.find((item) => item[0] == klineDate.value)) {
//       stockStore.setKlineDate(kLineData[0][0] + '')
//     }
//   } catch (error) {
//     console.error('获取股票日k失败:', error)
//   }
// }
const fetchUserInfo = async () => {
  if (!userId) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  try {
    const res = await userAPI.selectUserInfo(userId)
    userInfo.value = res.data
    updateHoldingsPrice()
  } catch (error) {
    console.error('获取用户信息失败:', error)
    ElMessage.error('获取用户信息失败')
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.profile-container {
  padding: 20px;
}
.user-info-card,
.order-list-card {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
.order-list {
  max-height: 600px;
  padding-right: 10px;
  overflow-y: auto;
}
.order-list::-webkit-scrollbar {
  width: 6px;
}
.order-list::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}
.order-card {
  margin-bottom: 10px;
}
.order-info {
  padding: 10px;
}
.order-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.deal-tag {
  margin-right: 10px;
}
.order-time {
  margin-left: auto;
  font-size: 14px;
  color: #909399;
}
.order-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.detail-item {
  display: flex;
  align-items: center;
}
.label {
  min-width: 80px;
  margin-right: 5px;
  color: #666666;
}
.hold-list {
  max-height: 400px;
  padding-right: 10px;
  overflow-y: auto;
}
.hold-item {
  margin-bottom: 10px;
}
.hold-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.market-id {
  font-size: 16px;
  font-weight: bold;
}
.holding-num {
  font-weight: bold;
  color: #409eff;
}
.hold-list::-webkit-scrollbar {
  width: 6px;
}
.hold-list::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}
</style>
