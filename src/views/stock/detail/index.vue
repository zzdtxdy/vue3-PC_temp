<template>
  <div class="stock-detail">
    <!-- K线图区域 -->
    <div class="k-line-container">
      <div ref="kLineChart" class="k-line-chart"></div>
      <!-- 买入按钮 -->
      <el-button type="primary" @click="showBuyDialog">买入</el-button>
      <el-button type="danger" @click="showSellDialog">卖出</el-button>
      <!-- 买入对话框 -->
      <el-dialog v-model="dialogVisible" title="买入委托" width="30%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="委托价格">
            <el-input v-model="form.price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="交易量">
            <el-input v-model="form.volume" type="number"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 卖出对话框 -->
      <el-dialog v-model="sellDialogVisible" title="卖出委托" width="30%">
        <el-form :model="sellForm" label-width="150px">
          <el-form-item label="委托价格">
            <el-input v-model="sellForm.price" type="number"></el-input>
          </el-form-item>
          <el-form-item :label="`交易量(最大${maxSellAmount})`">
            <el-input v-model="sellForm.volume" type="number"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="sellDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="handleSellConfirm">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <!-- 基本信息区域 -->
    <div class="stock-info">
      <el-descriptions :title="fetchMap[stockType].name + '基本信息'" :column="2" border>
        <el-descriptions-item :label="fetchMap[stockType].name + '代码'">{{ stockInfo.code }}</el-descriptions-item>
        <el-descriptions-item :label="fetchMap[stockType].name + '名称'">{{ stockInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="公司名称">{{ stockInfo.company }}</el-descriptions-item>
        <el-descriptions-item label="上市日期">{{ stockInfo.listingDateText }}</el-descriptions-item>
        <el-descriptions-item label="最新价">{{ stockInfo.currentPrice }}</el-descriptions-item>
        <el-descriptions-item :label="fetchMap[stockType].name + '类型'">{{ stockInfo.type }}</el-descriptions-item>
        <el-descriptions-item label="所属概念">{{ stockInfo.concept }}</el-descriptions-item>
        <!-- <el-descriptions-item label="涨跌幅">
          <span :class="stockInfo.changePercent >= 0 ? 'up' : 'down'">{{ stockInfo.changePercent }}%</span>
        </el-descriptions-item> -->
        <!-- <el-descriptions-item label="成交量">{{ stockInfo.volume }}</el-descriptions-item> -->
        <!-- <el-descriptions-item label="成交额">{{ stockInfo.amount }}</el-descriptions-item> -->
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import StockAPI from '@/api/stock'
import tradeAPI from '@/api/trade'
import goldAPI from '@/api/gold'
import fundAPI from '@/api/fund'
import futuresAPI from '@/api/futures'
import entrustAPI from '@/api/entrust'
import router from '@/router'
import { useStockStore } from '@/store/modules/stock'

const route = useRoute()
const userId = JSON.parse(localStorage.getItem('userInfo') || '{}').data?.id

let curDate = ref<string | null>(null)
// 对话框显示状态
const dialogVisible = ref(false)
const sellDialogVisible = ref(false)
const fetchMap = {
  stock: {
    api: StockAPI,
    name: '股票'
  },
  gold: {
    api: goldAPI,
    name: '黄金'
  },
  fund: {
    api: fundAPI,
    name: '期货'
  },
  future: {
    api: futuresAPI,
    name: '基金'
  }
}
// 表单数据
const form = reactive({
  price: '',
  volume: ''
})
const maxSellAmount = ref(0)
// 卖出表单数据
const sellForm = reactive({
  price: '',
  volume: ''
})
// 获取路由参数
const stockCode = ref(route.query.code as string)
type TabType = 'stock' | 'gold' | 'fund' | 'future'
//
const stockType = ref(route.query.type as TabType)
// K线图DOM引用
const kLineChart = ref<HTMLElement | null>(null)
// echarts实例
let chartInstance: echarts.ECharts | null = null
type StockInfo = {
  code: string // 股票代码
  name: string // 股票名称
  company: string // 公司名称
  concept: string // 所属概念
  listingDateText: string // 上市日期
  currentPrice: string // 最新价
  type: string // 股票类型
}
// 模拟的股票基本信息
const stockInfo = ref<StockInfo>({
  code: '',
  name: '',
  company: '',
  concept: '',
  listingDateText: '',
  currentPrice: '',
  type: ''
})

// 模拟的K线数据
let kLineData = [
  ['2024/01/01', 8.9, 9.2, 8.8, 9.1, 2000000], // [日期, 开盘价, 最高价, 最低价, 收盘价, 成交量]
  ['2024/01/02', 9.1, 9.5, 9.0, 9.3, 2500000]
  // ... 更多数据
]
const stockStore = useStockStore()
const klineDate = computed(() => stockStore.klineDate)

const initKLineChart = () => {
  if (!kLineChart.value) return

  chartInstance = echarts.init(kLineChart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: (params: any) => {
        let res = ''
        const date = params[0]?.axisValue || '未知日期'

        res += `日期：${date}<br/>`

        params.forEach((param: any) => {
          if (param.seriesType === 'candlestick') {
            const [open, high, low, close] = param.data
            const item = kLineData.find((item) => item[0] === date) || '无数据'
            res += `
        开盘价：${item[1]}<br/>
        最高价：${item[2]}<br/>
        最低价：${item[3]}<br/>
        收盘价：${item[4]}<br/>
        成交量：${item[5]}<br/>
        换手率：${item[6]}%<br/>
        涨跌额：${item[7]}<br/>
        成交额：${item[8]}<br/>
        涨跌幅：${item[9]}%<br/>`
          } else if (param.seriesType === 'line') {
            res += `${param.seriesName}：${param.data}<br/>`
          }
        })

        return res
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: kLineData.map((item) => item[0]),
      scale: true,
      boundaryGap: true,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        bottom: '5%',
        start: 50,
        end: 100
      }
    ],
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: kLineData.map((item) => item.slice(1, 5)),
        barWidth: '20%', // 自动调整柱体宽度
        itemStyle: {
          color: '#ef232a',
          color0: '#14b143',
          borderColor: '#ef232a',
          borderColor0: '#14b143'
        }
      },
      {
        name: '均线',
        type: 'line',
        data: kLineData.map((item) => item[4]), // 使用收盘价作为折线图数据
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#5470c6' // 折线颜色
        }
      }
    ]
  }

  chartInstance?.setOption(option)
  // 添加点击事件监听
  chartInstance?.on('click', (params) => {
    if (params.seriesType === 'candlestick') {
      const index = params.dataIndex // 当前点击项的索引
      const data = kLineData[index] // 获取点击项的完整数据
      console.log('点击项数据:', data)
      // 提取需要的数据
      const [date, open, high, low, close, volume, turnover, change, amount, changeRatio] = data
      curDate.value = String(date)
      if (curDate.value) {
        // sessionStorage.setItem('KLineDate', curDate.value + '')
        stockStore.setKlineDate(curDate.value + '')
      }
      console.log(`
        日期：${date}
        开盘价：${open}
        最高价：${high}
        最低价：${low}
        收盘价：${close}
        成交量：${volume}
        换手率：${turnover}%
        涨跌额：${change}
        成交额：${amount}
        涨跌幅：${changeRatio}%
      `)
    }
  })
}

// 获取股票 日k
const fetchDayLine = async () => {
  try {
    const dayLine = await fetchMap[stockType.value].api.dayLine(stockCode.value)
    console.log(dayLine)
    kLineData = []
    dayLine.data.forEach((i: any) => {
      kLineData.push([
        i.timeDay, // 日期
        Number(i.openDay), // 开盘价
        Number(i.highDay), // 最高价
        Number(i.lowDay), // 最低价
        Number(i.closeDay), // 收盘价
        Number(i.volume), // 成交量
        Number(i.turnoverRatio), // 换手率
        Number(i.changeDay), // 涨跌额
        Number(i.amount), // 成交额
        Number(i.changeRatio) // 涨跌幅
      ])
    })
    console.log(1111, kLineData)
    if (!klineDate.value || !kLineData.find((item) => item[0] == klineDate.value)) {
      stockStore.setKlineDate(kLineData[0][0] + '')
    }
  } catch (error) {
    console.error('获取股票日k失败:', error)
  }
}
// 获取股票详情
const fetchBasicInfo = async () => {
  try {
    // 这里添加获取股票详情的API调用
    console.log('获取股票详情:', stockCode.value)
    const basicInfo = await fetchMap[stockType.value].api.basicInfo(stockCode.value)
    const Name = [stockType.value] + 'Name'
    const { type, [Name]: name, thscode: code, issuePriceText: currentPrice, company, concept, listingDateText } = basicInfo.data
    stockInfo.value = {
      name,
      code: stockCode.value,
      currentPrice,
      company,
      concept,
      listingDateText,
      type: type == '1' ? '大盘' : '个股'
    }
    console.log(basicInfo)
  } catch (error) {
    console.error('获取股票详情失败:', error)
  }
}
// 监听窗口大小变化
const handleResize = () => {
  chartInstance?.resize()
}
// 显示买入对话框
const showBuyDialog = () => {
  if (!userId) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  dialogVisible.value = true
}
// 显示卖出对话框
const showSellDialog = async () => {
  if (!userId) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  if (!curDate.value && !klineDate.value) {
    ElMessage.error('请选择日K')
    return
  }
  try {
    const res = await tradeAPI.selectMaxTradeSellAmount({
      userId,
      marketId: stockCode.value,
      transTime: curDate.value || klineDate.value
    })
    maxSellAmount.value = res.data
    if (maxSellAmount.value <= 0) {
      ElMessage.warning('当前无可卖出数量')
      return
    }
    sellDialogVisible.value = true
  } catch (error) {
    ElMessage.error('获取可卖数量失败')
  }
}
// 确认买入
const handleConfirm = async () => {
  if (!curDate.value && !klineDate.value) {
    ElMessage.error('请选择日K')
    return
  }
  try {
    // 调用买入接口
    await entrustAPI.buyOrder({
      entrustType: stockType.value,
      transPrice: form.price,
      transAmount: form.volume,
      userId: userId,
      marketId: stockCode.value,
      transTime: curDate.value || klineDate.value
    })

    // 成功提示
    ElMessage.success('买入成功')
    // 关闭对话框
    dialogVisible.value = false
    // 重置表单
    form.price = ''
    form.volume = ''
  } catch (error) {
    ElMessage.error('买入失败')
  }
}
// 确认卖出
const handleSellConfirm = async () => {
  if (!curDate.value && !klineDate.value) {
    ElMessage.error('请选择日K')
    return
  }
  if (Number(sellForm.volume) > maxSellAmount.value) {
    ElMessage.error(`最大可卖数量为${maxSellAmount.value}`)
    return
  }
  try {
    await entrustAPI.sellOrder({
      entrustType: stockType.value,
      transPrice: sellForm.price,
      transAmount: sellForm.volume,
      userId: userId,
      marketId: stockCode.value,
      transTime: curDate.value || klineDate.value
    })

    ElMessage.success('卖出成功')
    sellDialogVisible.value = false
    sellForm.price = ''
    sellForm.volume = ''
  } catch (error) {
    ElMessage.error('卖出失败')
  }
}
onMounted(async () => {
  await fetchDayLine()
  fetchBasicInfo()
  initKLineChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.stock-detail {
  padding: 20px;
}
.k-line-container {
  width: 100%;
  margin-bottom: 20px;
}
.k-line-chart {
  width: 100%;
  height: 400px;
}
.stock-info {
  margin-top: 20px;
}
.up {
  color: #ef232a;
}
.down {
  color: #14b143;
}
:deep(.el-descriptions) {
  margin-top: 20px;
}

/* 添加以下样式 */
:deep(.el-descriptions__label) {
  width: 1%; /* 最小宽度 */
  white-space: nowrap; /* 防止文字换行 */
}
:deep(.el-descriptions__content) {
  word-break: break-all; /* 内容可以换行 */
}
:deep(.el-descriptions__cell) {
  padding: 8px 12px !important; /* 调整单元格内边距 */
}
</style>
