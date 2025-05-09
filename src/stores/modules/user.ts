import { getToken } from '@/utils/auth'
/*
 * @Description: 用户信息
 * @Author: zhongzd
 * @Date: 2024-08-05 09:18:21
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-05 18:04:37
 * @FilePath: \vue3-PC_temp\src\store\modules\user.ts
 */
import { useStorage } from '@vueuse/core'
import AuthAPI, { LoginData } from '@/api/auth'
import UserAPI, { UserInfo } from '@/api/user'
import store from '@/stores'

import { defineStore } from 'pinia'
import { clearToken } from '@/utils/auth'
import { useAuthStore } from '@/stores/modules/auth'
import { getRefreshToken, setRefreshToken, setToken } from '@/utils/auth'
export const useUserStore = defineStore('user', () => {
  // 用户信息 useStorage用于将响应式状态与浏览器的存储（如 localStorage 或 sessionStorage）同步
  const userInfo = useStorage<UserInfo>('userInfo', {} as UserInfo)

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then((data) => {
          const { tokenType, accessToken, refreshToken } = data
          setToken(tokenType + ' ' + accessToken) // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          if (refreshToken) {
            setRefreshToken(refreshToken)
          }
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data: UserInfo) => {
          if (!data) {
            reject('登陆失败，请重新登陆！')
            return
          }
          if (!data.roles || data.roles.length <= 0) {
            reject('该用户未分配角色，请联系管理员！')
            return
          }
          userInfo.value = data
          useAuthStore().setPerms(data.perms)
          useAuthStore().setRoles(data.roles)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.logout()
        .then(async () => {
          clearUserData()
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 刷新 token
   */
  function refreshToken() {
    const refreshToken = getRefreshToken()
    return new Promise<void>((resolve, reject) => {
      AuthAPI.refreshToken(refreshToken)
        .then((data: any) => {
          const { tokenType, accessToken, refreshToken } = data
          setToken(tokenType + ' ' + accessToken)
          setRefreshToken(refreshToken)
          resolve()
        })
        .catch((error: any) => {
          console.log(' refreshToken  刷新失败', error)
          reject(error)
        })
        .finally(() => {
          console.log(' refreshToken  刷新完成')
        })
    })
  }
  // remove token Router
  function clearUserData() {
    return new Promise<void>((resolve) => {
      clearToken()
      useAuthStore().resetRouter()
      resolve()
    })
  }

  return {
    userInfo,
    login,
    getUserInfo,
    logout,
    clearUserData,
    refreshToken
  }
})

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useUserStoreHook() {
  return useUserStore(store)
}
