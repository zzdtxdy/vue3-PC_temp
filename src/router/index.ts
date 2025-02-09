/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2025-01-09 10:09:39
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-02-08 14:15:11
 * @FilePath: \vue3-PC_temp\src\router\index.ts
 */
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import { staticRouter } from '@/router/modules/staticRouter'
export const Layout = () => import('@/layout/index.vue')
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import NProgress from '@/utils/nprogress'
import { WHITE_LIST } from '@/settings'
import { getToken } from '@/utils/auth'

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
  NProgress.start()
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const isLogin = !!getToken() // 判断是否登录
  // 已登录
  if (isLogin) {
    if (to.path === '/login') {
      // 已登录，访问登录页，跳转到首页
      next({ path: '/' })
    } else {
      if (authStore.isRoutesLoaded) {
        // 如果未匹配到任何路由 用于描述匹配到的路由记录数组
        if (to.matched.length === 0) {
          return next(from.name ? { name: from.name } : '/404')
        } else {
          // 动态设置标题
          const title = import.meta.env.VITE_GLOB_APP_TITLE
          document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

          next()
        }
      } else {
        try {
          // 生成动态路由
          const dynamicRoutes = await authStore.generateRoutes()
          dynamicRoutes.forEach((route: Menu.RouteVO) => router.addRoute(route as RouteRecordRaw))
          // 用户登录后 避免用户回退到登录页
          next({ ...to, replace: true })
        } catch (error) {
          console.error(error)
          // 路由加载失败，重置 路由&&token 并重定向到登录页
          await useUserStore().clearUserData()
          redirectToLogin(to, next)
          NProgress.done()
        }
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
      NProgress.done()
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

export default router
