import { defineStore } from 'pinia'
import piniaPersistConfig from '../persistConfig'

export const useStockStore = defineStore(
  'stock',
  () => {
    // ref变量 → state 属性
    const klineDate = ref(new Date().toISOString().split('T')[0])
    // computed计算属性 → getters
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // function函数 → actions
    // function increment() {
    //   count.value++
    // }
    function setKlineDate(date: string) {
      klineDate.value = date
    }
    return { klineDate, setKlineDate }
  },
  {
    persist: piniaPersistConfig('stock')
  }
)
