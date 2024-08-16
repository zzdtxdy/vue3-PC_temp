import { RouteRecordRaw } from 'vue-router'

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type AssemblySizeType = 'large' | 'default' | 'small'

export type LanguageType = 'zh' | 'en' | null

/* GlobalState */
export interface GlobalState {
  layout: LayoutType
  assemblySize: AssemblySizeType
  language: LanguageType
  maximize: boolean
  primary: string
  isDark: boolean
  isGrey: boolean
  isWeak: boolean
  asideInverted: boolean
  headerInverted: boolean
  sidebarStatus: boolean
  accordion: boolean
  watermark: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon: boolean
  footer: boolean
}

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
  close: boolean
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