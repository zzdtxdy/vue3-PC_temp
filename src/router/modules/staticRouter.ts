import { HOME_URL } from '@/settings'
import { RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')

// 静态路由
export const staticRouter: RouteRecordRaw[] = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   meta: { hidden: true },
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)', // 匹配 /redirect 后面跟随的任何路径
  //       component: () => import('@/views/redirect/index.vue')
  //     }
  //   ]
  // },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    redirect: HOME_URL,
    children: []
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: HOME_URL,
        component: () => import('@/views/dashboard/index.vue'),
        // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
        // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'homepage',
          affix: true,
          keepAlive: true
        }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/stock/detail/index.vue'),
        meta: {
          title: '详情',
          keepAlive: true
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/stock/order/index.vue'),
        meta: {
          title: '委托单',
          keepAlive: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: '个人信息',
          keepAlive: true
        }
      }
      // {
      //   path: '/stock',
      //   name: 'Stock',
      //   component: Layout,
      //   meta: {
      //     title: '股票管理',
      //     icon: 'stock' // 你需要确保有这个图标，或者换成你有的图标名
      //   },
      //   children: [
      //     {
      //       path: 'detail',
      //       name: 'StockDetail',
      //       component: () => import('@/views/stock/detail/index.vue'),
      //       meta: {
      //         title: '股票详情',
      //         keepAlive: true
      //       }
      //     }
      //   ]
      // }
    ]
  }

  // 外部链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [ {
  //       component: () => import("@/views/external-link/index.vue"),
  //       path: "https://www.cnblogs.com/haoxianrui/",
  //       meta: { title: "外部链接", icon: "link" },
  //     },
  //   ],
  // },
  // 多级嵌套路由
  /* {
         path: '/nested',
         component: Layout,
         redirect: '/nested/level1/level2',
         name: 'Nested',
         meta: {title: '多级菜单', icon: 'nested'},
         children: [
             {
                 path: 'level1',
                 component: () => import('@/views/nested/level1/index.vue'),
                 name: 'Level1',
                 meta: {title: '菜单一级'},
                 redirect: '/nested/level1/level2',
                 children: [
                     {
                         path: 'level2',
                         component: () => import('@/views/nested/level1/level2/index.vue'),
                         name: 'Level2',
                         meta: {title: '菜单二级'},
                         redirect: '/nested/level1/level2/level3',
                         children: [
                             {
                                 path: 'level3-1',
                                 component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
                                 name: 'Level3-1',
                                 meta: {title: '菜单三级-1'}
                             },
                             {
                                 path: 'level3-2',
                                 component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
                                 name: 'Level3-2',
                                 meta: {title: '菜单三级-2'}
                             }
                         ]
                     }
                 ]
             },
         ]
     }*/
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: '401页面',
      hidden: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404页面',
      hidden: true
    }
  },
  // 是一种路径参数匹配模式，用于捕获所有未匹配的路径
  /* :pathMatch 是一个动态路径参数表示在 URL 中匹配相应部分的任意值，(.*) 是一个正则表达式，表示匹配任意字符，* 表示可以匹配任意长度。 */
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
