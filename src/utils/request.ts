/*
 * @Description: axios请求封装
 * @Author: zhongzd
 * @Date: 2024-07-29 14:16:52
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-11-18 14:53:37
 * @FilePath: \vue3-PC_temp\src\utils\request.ts
 */
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStoreHook } from '@/store/modules/user'
import { ResultEnum } from '@/enums/ResultEnum'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import router from '@/router'
// import { checkStatus } from './checkStatus'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(TOKEN_KEY)
    if (accessToken) {
      config.headers.Authorization = accessToken
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
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
      return response
    }

    const { status, data, message } = response.data
    if (status == ResultEnum.SUCCESS) {
      return response.data
    }

    ElMessage.error(message || '系统出错')
    return Promise.reject(new Error(message || 'Error'))
  },
  (error: any) => {
    // 异常处理
    // 请求超时 && 网络错误单独判断，没有 response
    if (error.message.indexOf('timeout') !== -1) ElMessage.error('请求超时！请您稍后重试')
    if (error.message.indexOf('Network Error') !== -1) ElMessage.error('网络错误！请您稍后重试')
    const { response } = error
    // 根据服务器响应的错误状态码，做不同的处理
    // if (response) checkStatus(response.status)
    if (response) {
      const { status, message } = response
      if (status == ResultEnum.TOKEN_INVALID) {
        ElNotification({
          title: '提示',
          message: '您的会话已过期，请重新登录',
          type: 'info'
        })
        router.push('/login')
        // useUserStoreHook()
        //   .resetTokenRouter()
        //   .then(() => {
        //     // location.reload()

        //   })
      } else {
        ElMessage.error(message || '系统出错')
      }
    }
    return Promise.reject(error.message)
  }
)

// 导出 axios 实例
export default service
