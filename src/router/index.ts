/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2025-01-09 10:09:39
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-12 23:27:42
 * @FilePath: \vue3-PC_temp\src\router\index.ts
 */
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import { errorRouter, staticRouter } from '@/router/modules/staticRouter'
export const Layout = () => import('@/layout/index.vue')
import { useAuthStore } from '@/stores/modules/auth'
import { useUserStore } from '@/stores/modules/user'
import NProgress from '@/utils/nprogress'
import { WHITE_LIST } from '@/settings'
import { getToken } from '@/utils/auth'
import { initDynamicRouter } from './modules/dynamicRouter'
import { getTimeState } from '@/utils'

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter, ...errorRouter],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const isLogin = !!getToken() // 判断是否登录

  // 1.NProgress 开始
  NProgress.start()

  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 3.判断是否访问登陆页，有 Token 就在当前页面，没有 Token 重置路由清除token到登陆页
  if (to.path.toLocaleLowerCase() === '/login') {
    if (isLogin) return next(from.fullPath)
    await userStore.clearUserData()
    return next()
  }

  // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (WHITE_LIST.includes(to.path)) return next()

  // 5.判断是否有 Token，没有重定向到 login 页面
  if (!isLogin) return redirectToLogin(to, next)

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuList.length) {
    try {
      // 生成动态路由
      await initDynamicRouter()
      ElNotification({
        title: getTimeState(),
        type: 'success',
        duration: 1000
      })
      return next({ ...to, replace: true })
    } catch (error) {
      // 路由加载失败，重置 路由&&token 并重定向到登录页
      console.error(error)
      await useUserStore().clearUserData()
      return redirectToLogin(to, next)
    }
  }
  // 7.存储 routerName 做按钮权限筛选
  // authStore.setRouteName(to.name as string)

  // 8.如果未匹配到任何路由 用于描述匹配到的路由记录数组 留着当前页面
  if (to.matched.length === 0) {
    return next('404')
  }
  // 9.正常访问页面
  next()
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
