/*
 * @Description: 股票
 * @Author: zhongzd
 * @Date: 2024-11-18 14:27:58
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-12-02 13:48:36
 * @FilePath: \vue3-PC_temp\src\api\entrust.ts
 */
import request from '@/utils/request'

const BASE_URL = '/api/entrust/v1'

class entrustAPI {
  // /** 股票列表*/
  // static getList() {
  //   return request({
  //     url: `${BASE_URL}/stockList`,
  //     method: 'get'
  //   })
  // }
  /** 委托购买*/
  static buyOrder(data: any) {
    return request({
      url: `${BASE_URL}/buyOrder`,
      method: 'POST',
      data
    })
  }
  /** 获取委托列表*/
  static selectBuyOrderList(data: any) {
    return request({
      url: `${BASE_URL}/selectEntrustOrderList`,
      method: 'POST',
      data
    })
  }
  /** 委托卖出*/
  static sellOrder(data: any) {
    return request({
      url: `${BASE_URL}/sellOrder`,
      method: 'POST',
      data
    })
  }
}

export default entrustAPI
