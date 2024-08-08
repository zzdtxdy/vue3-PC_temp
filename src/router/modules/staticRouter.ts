import { RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/views/layout/index.vue')

// 静态路由
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        /* :path 是一个动态参数，它可以匹配任何路径段。
        (.*) 是一个正则表达式，它表示 :path 参数可以匹配任意字符，包括斜杠 /。这意味着 :path 可以匹配 /redirect 之后的任何路径。 */
        path: '/redirect/:path(.*)', // 匹配 /redirect 后面跟随的任何路径
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },

  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
        // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'homepage',
          affix: true,
          keepAlive: true
        }
      },
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: { hidden: true }
      }
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

export const errorRouter = []
