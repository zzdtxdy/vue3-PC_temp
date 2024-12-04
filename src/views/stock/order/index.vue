<template>
  <div class="order-list">
    <div v-for="item in orderList" :key="item.id" class="order-item">
      <div class="order-header">
        <span class="time">{{ formatTime(item?.createTime) }}</span>
        <!-- <span :class="['status', getStatusClass(item.flag)]">{{ getStatusText(item?.flag) }}</span> -->
      </div>
      <div class="order-content">
        <div class="order-info">
          <div class="type">
            {{ item.dealFlag === 0 ? '买入' : '卖出' }}
            <span class="entrustType">{{ getEntrustTypeText(item.entrustType) }}</span>
          </div>
          <div class="price">
            委托价格：
            <span>¥{{ item.transPrice }}</span>
          </div>
          <div class="amount">
            交易量：
            <span>{{ item.transAmount }}</span>
          </div>
          <div class="tax">
            税额：
            <span>¥{{ item.transTax }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStockStore } from '@/store/modules/stock'
import entrustAPI from '@/api/entrust'
import router from '@/router'
import dayjs from 'dayjs'
// 添加时间格式化函数
const formatTime = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
const stockStore = useStockStore()
interface OrderItem {
  id: number
  createTime: string
  flag: number
  dealFlag: number
  entrustType: string
  transPrice: number
  transAmount: number
  transTax: number
}

const orderList = ref<OrderItem[]>([])
const userId = JSON.parse(localStorage.getItem('userInfo') || '{}').data?.id

// 获取委托单列表
const getOrderList = async () => {
  if (!userId) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  try {
    const res = await entrustAPI.selectBuyOrderList({
      transTime: stockStore.klineDate,
      userId
    })
    orderList.value = res.data
  } catch (error) {
    console.error('获取委托单列表失败:', error)
  }
}

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

// 获取状态文本
const getStatusText = (flag: number) => {
  const statusMap: Record<number, string> = {
    0: '待处理',
    1: '已处理',
    2: '已取消',
    3: '处理异常'
  }
  return statusMap[flag] || '未知状态'
}

// 获取状态样式类名
const getStatusClass = (flag: number) => {
  const classMap: Record<number, string> = {
    0: 'pending',
    1: 'success',
    2: 'canceled',
    3: 'error'
  }
  return classMap[flag] || ''
}

watch(
  () => stockStore.klineDate,
  () => getOrderList(),
  { immediate: true }
)

// onMounted(() => {
//   getOrderList()
// })
</script>

<style lang="scss" scoped>
.order-list {
  padding: 16px;
  .order-item {
    padding: 16px;
    margin-bottom: 16px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 5%);
    .order-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .time {
        font-size: 14px;
        color: #666666;
      }
      .status {
        font-size: 14px;
        &.pending {
          color: #e6a23c;
        }
        &.success {
          color: #67c23a;
        }
        &.canceled {
          color: #909399;
        }
        &.error {
          color: #f56c6c;
        }
      }
      order-content {
        order-info {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          color: #666666;
          span {
            font-weight: 500;
            color: #333333;
          }
        }
        .type {
          font-size: 16px;
          font-weight: 500;
          color: #333333;
          .entrustType {
            margin-left: 8px;
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
