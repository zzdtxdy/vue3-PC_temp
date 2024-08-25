/*
 * @Description: 全局默认配置项
 * @Author: zhongzd
 * @Date: 2024-08-15 14:27:43
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 20:15:22
 * @FilePath: \vue3-PC_temp\src\settings.ts
 */
import { SizeEnum } from './enums/SizeEnum'
import { LayoutEnum } from './enums/LayoutEnum'
import { ThemeEnum } from './enums/ThemeEnum'
import { DeviceEnum } from './enums/DeviceEnum'
import { getBrowserLang } from './utils'

// 首页地址（默认）
export const HOME_URL: string = 'dashboard'

// 路由白名单地址（本地存在的路由 staticRouter.ts 中）
export const WHITE_LIST: string[] = ['/500', '/login']

// 高德地图 key
export const AMAP_MAP_KEY: string = ''

// 百度地图 key
export const BAIDU_MAP_KEY: string = ''

const { pkg } = __APP_INFO__

// 媒体查询 返回一个 MediaQueryList 对象 检测当前浏览器主题色是黑色
const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

const defaultSettings: AppSettings = {
  title: pkg.name,
  version: pkg.version,
  showSettings: true,
  tagsView: true,
  sidebarStatus: false,
  fixedHeader: true,
  sidebarLogo: true,
  layout: LayoutEnum.LEFT,
  theme: mediaQueryList.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT,
  size: SizeEnum.DEFAULT,
  language: getBrowserLang(),
  themeColor: '#409EFF',
  watermarkEnabled: false,
  watermarkContent: pkg.name,
  // 面包屑导航
  breadcrumb: true,
  // 面包屑导航图标
  breadcrumbIcon: true,
  // 标签页
  tabs: true,
  // 标签页图标
  tabsIcon: true,
  // 设备类型desktop|mobile
  device: DeviceEnum.DESKTOP,
  // 顶部菜单激活路径
  activeTopMenuPath: ''
}

export default defaultSettings
