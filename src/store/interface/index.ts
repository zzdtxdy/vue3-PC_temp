/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-04 12:45:40
 * @FilePath: \vue3-PC_temp\src\store\interface\index.ts
 */
import { RouteRecordRaw } from 'vue-router'

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type AssemblySizeType = 'large' | 'default' | 'small'

export type LanguageType = 'zh-cn' | 'en'

/* UserState */
export interface UserState {
  token: string
  userInfo: { name: string }
}

/* tabsMenuProps */
export interface TabsMenuProps {
  icon: string
  title: string
  path: string
  name: string
  isAffix: boolean
  isKeepAlive: boolean
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}

/* AuthState */
export interface AuthState {
  perms: string[]
  roles: string[]
  authMenuList: Menu.RouteVO[]
  mixLeftMenus: RouteRecordRaw[]
}

/* KeepAliveState */
export interface KeepAliveState {
  keepAliveName: string[]
}
