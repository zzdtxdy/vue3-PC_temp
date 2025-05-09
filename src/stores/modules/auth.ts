/*
 * @Description: 路由菜单 按钮角色权限
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 20:58:47
 * @FilePath: \vue3-PC_temp\src\stores\modules\auth.ts
 */
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from '@/utils'
import store from '@/stores'
import router from '@/router'

import MenuAPI from '@/api/menu'

export const useAuthStore = defineStore('auth', () => {
  // 权限
  const perms = ref<string[]>([])
  // 角色
  const roles = ref<string[]>([])
  // 菜单权限列表 ==> 这里的菜单没有经过任何处理
  const authMenuList = ref<Menu.RouteVO[]>([])

  // 混合模式左侧菜单路由
  const mixLeftMenuList = ref<Menu.RouteVO[]>([])

  // 菜单权限列表 ==> 扁平化之后的一维数组菜单
  const flatMenuListGet = computed(() => getFlatMenuList(authMenuList.value))

  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  const showMenuListGet = computed(() => getShowMenuList(authMenuList.value))
  // 递归处理后的所有面包屑导航列表
  const breadcrumbListGet = computed(() => getAllBreadcrumbList(authMenuList.value))

  /**
   * 生成动态路由
   */
  const getAuthMenuList = async () => {
    const data = await MenuAPI.getRoutes()
    authMenuList.value = data
  }
  /**
   * 根据父菜单路径设置混合模式左侧菜单
   *
   * @param parentPath 父菜单的路径，用于查找对应的菜单项
   */
  const setMixLeftMenuList = (parentPath: string) => {
    const matchedItem = authMenuList.value.find((item) => item.path === parentPath)
    if (matchedItem && matchedItem.children) {
      mixLeftMenuList.value = matchedItem.children
    }
  }

  /**
   * @description 重置路由 为了在用户退出登录后，移除当前用户的路由配置，防止权限泄露或路由不一致的问题
   * */
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    authMenuList.value.forEach((route) => {
      const { name } = route
      if (name && router.hasRoute(name)) router.removeRoute(name)
    })
    // 清空本地存储的路由和菜单数据
    authMenuList.value = []
    mixLeftMenuList.value = []
  }
  function setPerms(val: string[]) {
    perms.value = val
  }
  function setRoles(val: string[]) {
    roles.value = val
  }
  return {
    authMenuList,
    getAuthMenuList,
    mixLeftMenuList,
    setMixLeftMenuList,
    resetRouter,
    flatMenuListGet,
    showMenuListGet,
    setPerms,
    setRoles,
    roles,
    perms,
    breadcrumbListGet
  }
})

/**
 * 在组件外使用 Pinia store 实例 @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useAuthStoreHook() {
  return useAuthStore(store)
}
