/*
 * @Description: axios请求封装
 * @Author: zhongzd
 * @Date: 2024-07-29 14:16:52
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-29 13:33:21
 * @FilePath: \vue3-PC_temp\src\utils\request.ts
 */
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStoreHook } from '@/stores/modules/user'
import { ResultEnum } from '@/enums/api/ResultEnum'
import { getToken } from '@/utils/auth'
import qs from 'qs'
import router from '@/router'
// import { checkStatus } from './checkStatus'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // 将 params 对象序列化为查询字符串
  paramsSerializer: (params) => qs.stringify(params)
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken()
    // 如果 Authorization 设置为 no-auth，则不携带 Token，用于登录、刷新 Token 等接口
    if (config.headers.Authorization !== 'no-auth' && accessToken) {
      config.headers.Authorization = accessToken
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应是二进制流，则直接返回，用于下载文件、Excel 导出等
    if (response.config.responseType === 'blob') {
      return response
    }

    const { code, data, msg } = response.data
    if (code === ResultEnum.SUCCESS || code == 200) {
      return data
    }

    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: any) => {
    // 非 2xx 状态码处理 401、403、500 等
    const { config, response } = error
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) {
      const { code, msg } = response.data
      if (code === ResultEnum.ACCESS_TOKEN_INVALID) {
        // Token 过期，刷新 Token
        return handleTokenRefresh(config)
      } else if (code === ResultEnum.REFRESH_TOKEN_INVALID) {
        return Promise.reject(new Error(msg || '刷新令牌无效或过期'))
      } else {
        ElMessage.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  }
)

// 导出 axios 实例
export default service

// 防止重复刷新 Token。当多个请求因 Token 过期失败时，应该只发送 一次 刷新 Token 请求
let isRefreshing = false
// 存储所有因 Token 失效而失败的请求
let waitingQueue: Array<() => void> = []

// 刷新 Token 处理
async function handleTokenRefresh(config: InternalAxiosRequestConfig) {
  return new Promise((resolve) => {
    // 封装需要重试的请求
    const retryRequest = () => {
      config.headers.Authorization = getToken()
      resolve(service(config))
    }

    waitingQueue.push(retryRequest)

    if (!isRefreshing) {
      isRefreshing = true

      // 刷新 Token
      useUserStoreHook()
        .refreshToken()
        .then(() => {
          // Token 刷新成功，执行请求队列
          waitingQueue.forEach((callback) => callback())
          waitingQueue = []
        })
        .catch((error) => {
          console.log('handleTokenRefresh error 刷新令牌无效', error)
          // Token 刷新失败，清除用户数据并跳转到登录
          ElNotification({
            title: '提示',
            message: '您的会话已过期，请重新登录',
            type: 'info'
          })
          useUserStoreHook()
            .clearUserData()
            .then(() => {
              router.push('/login')
            })
        })
        .finally(() => {
          console.log(11111)

          isRefreshing = false
        })
    }
  })
}
