/*
 * @Description: 股票
 * @Author: zhongzd
 * @Date: 2024-11-18 14:27:58
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-11-28 16:28:33
 * @FilePath: \vue3-PC_temp\src\api\futures.ts
 */
import request from '@/utils/request'

const BASE_URL = '/api/futures/v1'

class futuresAPI {
  /** 股票列表*/
  static getList() {
    return request({
      url: `${BASE_URL}/futuresList`,
      method: 'get'
    })
  }
  /** 获取日k图*/
  static dayLine(code: string) {
    return request({
      url: `${BASE_URL}/dayLine/futuresCode/${code}`,
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

export default futuresAPI
