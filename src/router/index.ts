import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { staticRouter } from '@/router/modules/staticRouter'
export const Layout = () => import('@/views/layout/index.vue')

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
