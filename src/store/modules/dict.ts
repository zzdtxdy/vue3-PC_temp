/*
 * @Description: 字典数据
 * @Author: zhongzd
 * @Date: 2025-01-30 12:15:13
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-31 13:48:58
 * @FilePath: \vue3-PC_temp\src\store\modules\dict.ts
 */
import store from '@/store'
import DictionaryAPI, { type DictVO, type DictData } from '@/api/dict'
import { useStorage } from '@vueuse/core'

export const useDictStore = defineStore('dict', () => {
  const dictionary = useStorage<Record<string, DictData[]>>('dictionary', {})

  const setDictionary = (dict: DictVO) => {
    dictionary.value[dict.dictCode] = dict.dictDataList
  }

  const loadDictionaries = async () => {
    const dictList = await DictionaryAPI.getList()
    dictList.forEach(setDictionary)
  }

  const getDictionary = (dictCode: string): DictData[] => {
    return dictionary.value[dictCode] || []
  }

  const clearDictionaryCache = () => {
    dictionary.value = {}
  }

  const updateDictionaryCache = async () => {
    clearDictionaryCache() // 先清除旧缓存
    await loadDictionaries() // 重新加载最新字典数据
  }

  const getParamsDict = (dictCodeObj: object) => {
    const dictData = DictionaryAPI.getParamsDict(dictCodeObj)
    dictionary.value = { ...dictionary.value, ...dictData }
  }
  return {
    dictionary,
    setDictionary,
    loadDictionaries,
    getDictionary,
    clearDictionaryCache,
    updateDictionaryCache,
    getParamsDict
  }
})

export function useDictStoreHook() {
  return useDictStore(store)
}
