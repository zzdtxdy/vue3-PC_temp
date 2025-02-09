import { staticRouter } from '@/router/modules/staticRouter'
import { getFlatMenuList, getShowMenuList } from '@/utils'
import store from '@/store'
import router from '@/router'

import MenuAPI from '@/api/menu'
import { RouteRecordRaw } from 'vue-router'
const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

export const useAuthStore = defineStore('auth', () => {
  // 权限
  const perms = ref<string[]>([])
  // 角色
  const roles = ref<string[]>([])
  // 所有路由，包括静态和动态路由
  const routes = ref<Menu.RouteVO[]>([])
  // 混合模式左侧菜单路由
  const mixedLayoutLeftRoutes = ref<Menu.RouteVO[]>([])
  // 路由是否加载完成
  const isRoutesLoaded = ref(false)

  // 菜单权限列表 ==> 扁平化之后的一维数组菜单
  const flatMenuListGet = computed(() => getFlatMenuList(routes.value))
  /**
   * 生成动态路由
   */
  const generateRoutes = () => {
    return new Promise<Menu.RouteVO[]>((resolve, reject) => {
      MenuAPI.getRoutes()
        .then((data) => {
          // 转换路由数据为组件
          const dynamicRoutes: Menu.RouteVO[] = parseDynamicRoutes(data)
          // 包括静态和动态路由
          routes.value = [...staticRouter, ...dynamicRoutes] as Menu.RouteVO[]
          isRoutesLoaded.value = true
          resolve(dynamicRoutes)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /** 判断是否有权限 */
  function hasAuth(value: string | string[], type: 'button' | 'role' = 'button') {
    // 超级管理员 拥有所有权限
    if (type === 'button' && roles.value.includes('ROOT')) {
      return true
    }
    const auths = type === 'button' ? perms.value : roles.value
    return typeof value === 'string'
      ? auths.includes(value)
      : value.some((perm) => auths.includes(perm))
  }
  /**
   * 根据父菜单路径设置混合模式左侧菜单
   *
   * @param parentPath 父菜单的路径，用于查找对应的菜单项
   */
  const setMixedLayoutLeftRoutes = (parentPath: string) => {
    const matchedItem = routes.value.find((item) => item.path === parentPath)
    if (matchedItem && matchedItem.children) {
      mixedLayoutLeftRoutes.value = matchedItem.children
    }
  }

  /**
   * @description 重置路由 为了在用户退出登录后，移除当前用户的路由配置，防止权限泄露或路由不一致的问题
   * */
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    routes.value.forEach((route) => {
      if (route.name && !staticRouter.find((r: any) => r.name === route.name)) {
        // 从 router 实例中移除动态路由
        router.removeRoute(route.name)
      }
    })
    // 清空本地存储的路由和菜单数据
    routes.value = []
    mixedLayoutLeftRoutes.value = []
    isRoutesLoaded.value = false
  }
  function setPerms(val: string[]) {
    perms.value = val
  }
  function setRoles(val: string[]) {
    roles.value = val
  }
  return {
    routes,
    generateRoutes,
    mixedLayoutLeftRoutes,
    setMixedLayoutLeftRoutes,
    isRoutesLoaded,
    resetRouter,
    hasAuth,
    flatMenuListGet,
    setPerms,
    setRoles,
    roles,
    perms
  }
})
const loadComponent = (componentName: string) => {
  return modules[`../../views/${componentName}.vue`] || modules['../../views/error-page/404.vue']
}
/**
 * 转换路由数据为组件
 */
const parseDynamicRoutes = (routes: Menu.RouteVO[]): Menu.RouteVO[] => {
  return routes.map((route: Menu.RouteVO) => {
    const tmpRoute = { ...route }
    // 顶级目录，替换为 Layout 组件
    tmpRoute.component =
      tmpRoute.component?.toString() === 'Layout' ? Layout : loadComponent(tmpRoute.component)

    if (route.children) {
      tmpRoute.children = parseDynamicRoutes(route.children)
    }

    return tmpRoute
  })
}

/**
 * 在组件外使用 Pinia store 实例 @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useAuthStoreHook() {
  return useAuthStore(store)
}
