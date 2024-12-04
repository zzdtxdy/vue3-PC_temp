/*
 * @Description: 股票
 * @Author: zhongzd
 * @Date: 2024-11-18 14:27:58
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-12-02 14:23:57
 * @FilePath: \vue3-PC_temp\src\api\trade.ts
 */
import request from '@/utils/request'

const BASE_URL = '/api/trade/stock/v1'

class tradeAPI {
  /** 当日最大交易量*/
  static selectMaxTradeSellAmount({ userId, marketId, transTime }: { userId: string; marketId: string; transTime: string }) {
    return request({
      url: `${BASE_URL}/selectMaxTradeSellAmount/userId/${userId}/marketId/${marketId}/transTime/${transTime}`,
      method: 'get'
    })
  }
}

export default tradeAPI
