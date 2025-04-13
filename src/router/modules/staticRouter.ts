/*
 * @Description:静态路由
 * @Author: zhongzd
 * @Date: 2024-08-10 13:12:03
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-12 23:30:48
 * @FilePath: \vue3-PC_temp\src\router\modules\staticRouter.ts
 */
import { HOME_URL } from '@/settings'
import { RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')

// 静态路由
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { isHide: true },
    children: [
      {
        path: '/redirect/:path(.*)', // 匹配 /redirect 后面跟随的任何路径
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { isHide: true }
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
    redirect: HOME_URL,
    children: [
      // {
      //   path: HOME_URL,
      //   component: () => import('@/views/dashboard/index.vue'),
      //   // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
      //   // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
      //   name: 'home',
      //   meta: {
      //     title: '首页',
      //     icon: 'homepage',
      //     isAffix: true,
      //     isKeepAlive: true
      //   }
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
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error/401.vue"),
    meta: {
      title: "401页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404页面"
    }
  },
]
