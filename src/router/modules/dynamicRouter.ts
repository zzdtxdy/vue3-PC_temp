/*
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-04-05 21:51:00
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-12 11:56:56
 * @FilePath: \vue3-PC_temp\src\router\modules\dynamicRouter.ts
 */
import router from '@/router/index'
import { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/store/modules/auth'
import { clearToken } from '@/utils/auth'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = useAuthStore()

  try {
    // 1. 获取菜单列表
    await authStore.getAuthMenuList()
    // 2. 判断当前用户是否有菜单权限
    if (!authStore.authMenuList.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000
      })
      clearToken()
      router.replace('/login')
      return Promise.reject(new Error('No permission'))
    }

    // 3. 添加动态路由
    authStore.flatMenuListGet.forEach((item: Menu.RouteVO) => {
      try {
        // 删除子路由，确保扁平化
        if (item.children) {
          delete item.children
        }

        // 动态加载组件
        if (item.component && typeof item.component === 'string') {
          const componentPath = `/src/views${item.component}.vue`
          item.component = modules[componentPath] || modules[`/src/views/error/404.vue`]
        }

        // 根据路由类型添加到对应的父级
        if (item.meta?.isFull) {
          router.addRoute(item as unknown as RouteRecordRaw)
        } else {
          router.addRoute('layout', item as unknown as RouteRecordRaw)
        }
      } catch (error) {
        console.error(`添加路由失败: ${item.path}`, error)
      }
    })
    console.log(authStore.flatMenuListGet);
    
  } catch (error) {
    // 当菜单请求出错时，重定向到登录页
    ElNotification({
      title: '加载菜单失败',
      message: '菜单加载失败，请重新登录！',
      type: 'error',
      duration: 3000
    })
    clearToken()
    router.replace('/login')
    return Promise.reject(error)
  }
}
