/*
 * @Description: 用户信息
 * @Author: zhongzd
 * @Date: 2024-08-05 09:18:21
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-27 17:24:06
 * @FilePath: \vue3-PC_temp\src\store\modules\user.ts
 */
import AuthAPI, { LoginData } from '@/api/auth'
import UserAPI, { UserInfo } from '@/api/user'
import { resetRouter } from '@/router'
import store from '@/store'

import { TOKEN_KEY } from '@/enums/CacheEnum'
import { defineStore } from 'pinia'
import { clearToken } from '@/utils'
import { useAuthStore } from '@/store/modules/auth'
export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>({
    roles: [], // 角色
    perms: [] // 权限
  })

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
          const { tokenType, accessToken } = data
          localStorage.setItem(TOKEN_KEY, tokenType + ' ' + accessToken) // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
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
            reject('Verification failed, please Login again.')
            return
          }
          if (!data.roles || data.roles.length <= 0) {
            reject('getUserInfo: roles must be a non-null array!')
            return
          }
          Object.assign(user.value, { ...data })
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
          await clearUserData()
          location.reload() // 重新加载页面
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // remove token Router
  function clearUserData() {
    return new Promise<void>((resolve) => {
      clearToken()
      resetRouter()
      resolve()
    })
  }

  return {
    user,
    login,
    getUserInfo,
    logout,
    clearUserData
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
