/*
 * @Description: 股票
 * @Author: zhongzd
 * @Date: 2024-11-18 14:27:58
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-11-18 15:05:10
 * @FilePath: \vue3-PC_temp\src\api\stock.ts
 */
import request from '@/utils/request'

const BASE_URL = '/api/fund/v1'

class fundAPI {
  /** 股票列表*/
  static getList() {
    return request({
      url: `${BASE_URL}/fundList`,
      method: 'get'
    })
  }
  /** 获取日k图*/
  static dayLine(code: string) {
    return request({
      url: `${BASE_URL}/dayLine/fundCode/${code}`,
      method: 'get'
    })
  }
  /** 获取公司简况  */
  static basicInfo(thscode: string) {
    return request({
      url: `${BASE_URL}/basicInfo/${thscode}`,
      method: 'get'
    })
  }
}

export default fundAPI
