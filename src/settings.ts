/*
 * @Description: 全局默认配置项
 * @Author: zhongzd
 * @Date: 2024-08-15 14:27:43
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-12 21:13:03
 * @FilePath: \vue3-PC_temp\src\settings.ts
 */
import { ComponentSize } from './enums/settings/LayoutEnum'
import { LayoutEnum } from './enums/settings/LayoutEnum'
import { DeviceEnum } from './enums/settings/DeviceEnum'
import { getBrowserLang, isMobile } from './utils'
import { SidebarColor } from './enums/settings/ThemeEnum'

// 首页地址（默认）
export const HOME_URL: string = '/home/index'

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
  // 系统标题
  title: pkg.name,
  // 系统版本
  version: pkg.version,
  // 是否显示设置
  showSettings: true,
  // 是否显示标签视图
  tabsView: true,
  // 是否显示多标签导航图标
  tabsIcon: true,
  // 是否固定头部
  fixedHeader: true,
  sidebar: {
    opened: true, // 侧边栏状态
    isLogo: true, // 是否显示侧边栏Logo
    withoutAnimation: true
  },
  // 布局模式：left-左侧模式(默认) top-顶部模式 mix-混合模式
  layout: LayoutEnum.LEFT,
  // 主题模式(是否暗黑)
  isDark: mediaQueryList.matches ? true : false,
  // 布局大小(default |large |small)
  size: ComponentSize.DEFAULT,
  language: getBrowserLang(),
  themeColor: '#409EFF',
  // 是否开启水印
  watermarkEnabled: false,
  // 水印内容
  watermarkContent: pkg.name,
  // 设备类型desktop|mobile
  device: isMobile() ? DeviceEnum.MOBILE : DeviceEnum.DESKTOP,
  // 激活的顶部菜单路径
  activeTopMenuPath: '',
  // 侧边栏配色方案
  sidebarColorScheme: SidebarColor.CLASSIC_BLUE
}
export default defaultSettings
