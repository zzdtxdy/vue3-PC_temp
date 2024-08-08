/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-03 11:14:09
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-08 15:41:32
 * @FilePath: \zzd\vue3-PC_temp\src\router\modules\dynamicRouter.ts
 */
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import NProgress from '@/config/nprogress'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import router from '@/router'
import { usePermissionStore, useUserStore } from '@/store'

export function setupPermission() {
  // 白名单路由
  const whiteList = ['/login']

  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = localStorage.getItem(TOKEN_KEY)

    if (hasToken) {
      if (to.path === '/login') {
        // 如果已登录，跳转到首页
        next({ path: '/' })
        NProgress.done()
      } else {
        const userStore = useUserStore()
        const hasRoles = userStore.user.roles && userStore.user.roles.length > 0
        // store已有角色
        if (hasRoles) {
          // 如果未匹配到任何路由 用于描述匹配到的路由记录数组
          if (to.matched.length === 0) {
            // 跳回之前的页面 否则转到404页面
            next(from.name ? { name: from.name } : '/404')
          } else {
            // 如果路由参数中有 title，覆盖路由元信息中的 title
            // 动态设置标题
            const title = import.meta.env.VITE_GLOB_APP_TITLE
            to.meta.title = (to.params.title as string) || (to.query.title as string)
            document.title = to.meta.title ? `${title} - ${to.meta.title}` : title

            next()
          }
          // store没有角色 重新请求拿角色
        } else {
          const permissionStore = usePermissionStore()
          try {
            await userStore.getUserInfo()
            const dynamicRoutes = await permissionStore.generateRoutes()
            dynamicRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
            next({ ...to, replace: true })
          } catch (error) {
            // 移除 token 并重定向到登录页，携带当前页面路由作为跳转参数
            await userStore.resetToken()
            redirectToLogin(to, next)
            NProgress.done()
          }
        }
      }
    } else {
      // 未登录
      if (whiteList.includes(to.path)) {
        next() // 在白名单，直接进入
      } else {
        // 不在白名单，重定向到登录页
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

/** 判断是否有权限 */
export function hasAuth(value: string | string[], type: 'button' | 'role' = 'button'): boolean {
  const { roles, perms } = useUserStore().user

  // 超级管理员ROOT 拥有所有权限 // 管理员ADMIN
  if (type === 'button' && roles.includes('ROOT')) {
    return true
  }

  const auths = type === 'button' ? perms : roles
  return typeof value === 'string' ? auths.includes(value) : value.some((perm) => auths.includes(perm))
}
