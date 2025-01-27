/*
 * @Description: 权限、角色
 * @Author: zhongzd
 * @Date: 2024-08-16 14:06:10
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-27 16:30:22
 * @FilePath: \vue3-PC_temp\src\store\modules\auth.ts
 */
import { defineStore } from 'pinia'
import store from '@/store'
import MenuAPI from '@/api/menu'
import { AuthState } from '@/store/interface'
import { getFlatMenuList, getShowMenuList } from '@/utils'
import { RouteRecordRaw } from 'vue-router'
import { staticRouter } from '@/router/modules/staticRouter'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    perms: [], // 权限
    roles: [], // 角色
    authMenuList: [], // 动态路由 菜单权限列表
    mixLeftMenus: [] // 混合模式 左侧菜单列表
  }),
  getters: {
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 hidden == true
    showMenuListGet: (state) => getShowMenuList(state.authMenuList)
  },
  actions: {
    // 获取动态路由
    async getAuthMenuList() {
      this.authMenuList = await MenuAPI.getRoutes()
      // this.authMenuList = staticRouter.concat(this.authMenuList)
    },
    /** 判断是否有权限 */
    hasAuth(value: string | string[], type: 'button' | 'role' = 'button') {
      // 超级管理员 拥有所有权限
      if (type === 'button' && this.roles.includes('ROOT')) {
        return true
      }
      const auths = type === 'button' ? this.perms : this.roles
      return typeof value === 'string' ? auths.includes(value) : value.some((perm) => auths.includes(perm))
    },
    setPerms(perms: string[]) {
      this.perms = perms
    },
    setRoles(roles: string[]) {
      this.roles = roles
    },
    setMixLeftMenus(mixLeftMenus: RouteRecordRaw[]) {
      this.mixLeftMenus = mixLeftMenus
    },
    resetMixLeftMenus() {
      this.mixLeftMenus = []
    },
    resetPerms() {
      this.perms = []
    },
    resetRoles() {
      this.roles = []
    }
  }
})
/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useAuthStoreHook() {
  return useAuthStore(store)
}
