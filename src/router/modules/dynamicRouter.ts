import router from '@/router/index'
import { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/store/modules/auth'
import { clearToken } from '@/utils'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = useAuthStore()

  try {
    // 1.获取菜单列表
    await authStore.getAuthMenuList()

    // 2.判断当前用户有没有菜单
    if (!authStore.authMenuList.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000
      })
      clearToken()
      router.replace('/login')
      return Promise.reject('No permission')
    }

    // 3.添加动态路由
    authStore.flatMenuListGet.forEach((item: Menu.RouteVO) => {
      item.children && delete item.children
      if (item.component && typeof item.component == 'string') {
        //返回结构 { '/src/views/Home.vue': () => import('/src/views/Home.vue'), }
        item.component = modules['/src/views' + item.component + '.vue']
      }
      // 是否需要全屏展示 默认不全屏 在layout下面
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  } catch (error) {
    // 当菜单请求出错时，重定向到登陆页
    clearToken()
    router.replace('/login')
    return Promise.reject(error)
  }
}
