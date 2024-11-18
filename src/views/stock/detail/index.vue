<template>
  <div class="stock-detail">
    <!-- K线图区域 -->
    <div class="k-line-container">
      <div ref="kLineChart" class="k-line-chart"></div>
    </div>

    <!-- 基本信息区域 -->
    <div class="stock-info">
      <el-descriptions title="股票基本信息" :column="2" border>
        <el-descriptions-item label="股票代码">{{ stockInfo.code }}</el-descriptions-item>
        <el-descriptions-item label="股票名称">{{ stockInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="公司名称">{{ stockInfo.company }}</el-descriptions-item>
        <el-descriptions-item label="上市日期">{{ stockInfo.listingDateText }}</el-descriptions-item>
        <el-descriptions-item label="最新价">{{ stockInfo.currentPrice }}</el-descriptions-item>
        <el-descriptions-item label="股票类型">{{ stockInfo.type }}</el-descriptions-item>
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
const route = useRoute()

// 获取路由参数
const stockCode = ref(route.query.code as string)
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
}

// 获取股票 日k
const fetchDayLine = async () => {
  try {
    const dayLine = await StockAPI.dayLine(stockCode.value)
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
        Number(i.changeRatioDay) // 涨跌幅
      ])
    })
    console.log(1111, kLineData)
  } catch (error) {
    console.error('获取股票日k失败:', error)
  }
}
// 获取股票详情
const fetchBasicInfo = async () => {
  try {
    // 这里添加获取股票详情的API调用
    console.log('获取股票详情:', stockCode.value)
    const basicInfo = await StockAPI.basicInfo(stockCode.value)
    const {
      type,
      stockName: name,
      thscode: code,
      issuePriceText: currentPrice,
      company,
      concept,
      listingDateText
    } = basicInfo.data
    stockInfo.value = {
      name,
      code,
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
