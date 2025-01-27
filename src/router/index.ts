/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2025-01-09 10:09:39
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-27 16:35:32
 * @FilePath: \vue3-PC_temp\src\router\index.ts
 */
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { staticRouter } from '@/router/modules/staticRouter'
export const Layout = () => import('@/layout/index.vue')
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import NProgress from '@/utils/nprogress'
import { WHITE_LIST } from '@/settings'
import { initDynamicRouter } from './modules/dynamicRouter'

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  NProgress.start()
  // 已登录
  if (localStorage.getItem(TOKEN_KEY)) {
    if (to.path === '/login') {
      // 如果已登录，跳转到首页
      next({ path: '/' })
    } else {
      const hasRoles = authStore.roles && authStore.roles.length > 0
      // 没有任何角色权限 重新请求
      if (!hasRoles) {
        try {
          await userStore.getUserInfo()
        } catch (error) {
          // 清空路由 && token
          await userStore.clearUserData()
          // 移除 token 并重定向到登录页，携带当前页面路由作为跳转参数
          redirectToLogin(to, next)
        }
      }
      // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
      if (!authStore.authMenuList.length) {
        try {
          await initDynamicRouter()
        } catch (error) {
          // 清空路由 && token
          await userStore.clearUserData()
          // 移除 token 并重定向到登录页，携带当前页面路由作为跳转参数
          redirectToLogin(to, next)
        }
      }
      // 如果未匹配到任何路由 用于描述匹配到的路由记录数组
      if (to.matched.length === 0) {
        // 跳回之前的页面 否则转到404页面
        return next(from.name ? { name: from.name } : '/404')
      } else {
        // 动态设置标题
        const title = import.meta.env.VITE_GLOB_APP_TITLE
        document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

        next()
      }
    }
  } else {
    // 未登录
    if (WHITE_LIST.includes(to.path)) {
      next() // 在白名单，直接进入
    } else {
      // 清空路由 && token
      await userStore.clearUserData()
      // 移除 token 并重定向到登录页，携带当前页面路由作为跳转参数
      redirectToLogin(to, next)
    }
  }
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done()
})

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 * @description 重置路由 为了在用户退出登录后，移除当前用户的路由配置，防止权限泄露或路由不一致的问题
 * */
export const resetRouter = () => {
  const authStore = useAuthStore()
  authStore.flatMenuListGet.forEach((route: Menu.RouteVO) => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}

/** 重定向到登录页并可返回到原页面 */
function redirectToLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
  // 读取及设置 URL 的查询参数
  const params = new URLSearchParams(to.query as Record<string, string>)
  // 将 URLSearchParams 对象转换回查询字符串  ?user=John&age=30输出: "user=John&age=30"
  const queryString = params.toString()
  // 将查询参数 放入redirect Url
  const redirect = queryString ? `${to.path}?${queryString}` : to.path
  // 重定向到登录页 并将路径存入URL以便登录后可以返回到原页面
  next(`/login?redirect=${encodeURIComponent(redirect)}`)
}

/**
 * 混合模式菜单下根据顶部菜单路径设置左侧菜单
 *
 * @param topMenuPath - 顶部菜单路径
 */
export const setMixLeftMenus = (topMenuPath: string) => {
  const allRoutes = router.getRoutes()
  const matchedItem = allRoutes.find((item) => item.path === topMenuPath)
  if (matchedItem && matchedItem.children) {
    useAuthStore().mixLeftMenus = matchedItem.children
  }
}
export default router
