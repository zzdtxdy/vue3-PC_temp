import { MenuTypeEnum } from '@/enums/MenuTypeEnum'

/* declare global 是 TypeScript 中用来扩展全局作用域的语法。
它允许你在全局作用域中添加或修改类型声明，而不必在每个文件中重复声明。 */
declare global {
  /**
   * 响应数据
   */
  interface ResponseData<T = any> {
    code: string
    data: T
    msg: string
  }

  /**
   * 分页查询参数
   */
  interface PageQuery {
    pageNum: number
    pageSize: number
  }

  /**
   * 分页响应对象
   */
  interface PageResult<T> {
    /** 数据列表 */
    list: T
    /** 总数 */
    total: number
  }

  /**
   * 页签对象
   */
  interface TagView {
    /** 页签名称 */
    name: string
    /** 页签标题 */
    title: string
    /** 页签路由路径 */
    path: string
    /** 页签路由完整路径 */
    fullPath: string
    /** 页签图标 */
    icon?: string
    /** 是否固定页签 */
    affix?: boolean
    /** 是否开启缓存 */
    keepAlive?: boolean
    /** 路由查询参数 */
    query?: any
  }

  /**
   * 系统设置
   */
  interface AppSettings {
    /** 系统标题 */
    title: string
    /** 系统版本 */
    version: string
    /** 是否显示设置 */
    showSettings?: boolean
    /** 是否折叠菜单 */
    sidebarStatus: boolean
    /** 是否固定头部 */
    fixedHeader: boolean
    /** 是否显示多标签导航 */
    tagsView: boolean
    /** 是否显示侧边栏Logo */
    sidebarLogo: boolean
    /** 导航栏布局(left|top|mix) */
    layout: string
    /** 主题颜色 */
    themeColor: string
    /** 主题模式(dark|light) */
    theme: string
    /** 布局大小(default |large |small) */
    size: string
    /** 语言( zh-cn| en) */
    language: string
    /** 面包屑导航 */
    breadcrumb: boolean
    /** 面包屑导航图标 */
    breadcrumbIcon: boolean
    /** 标签页 */
    tabs: boolean
    /** 标签页图标 */
    tabsIcon: boolean
    /** 是否开启水印 */
    watermarkEnabled: boolean
    /** 水印内容 */
    watermarkContent: string
    /** 设备类型desktop|mobile */
    device: string
    /** 顶部菜单激活路径 */
    activeTopMenuPath: string
  }

  /**
   * 组件数据源
   */
  interface OptionType {
    /** 值 */
    value: string | number
    /** 文本 */
    label: string
    /** 子列表  */
    children?: OptionType[]
  }
  /* 当你想要将相关的代码（如接口、类、函数等）组织在一起，以便于它们之间的交互和复用，同时避免全局作用域的污染时，你会使用declare namespace。
  此外，命名空间还可以用于声明合并，即将来自不同文件的相同命名空间的声明合并到一个命名空间中 */
  declare module '*.yaml' {
    const content: any
    export default content
  }
  /* 菜单 */
  declare namespace Menu {
    /** RouteVO，路由对象 */
    interface RouteVO {
      /** 路由路径 */
      path: string
      /** 路由名称 */
      name: string
      /** 组件路径 */
      component: string | (() => Promise<unknown>)
      /** 跳转链接 */
      redirect?: string
      /** 路由属性 */
      meta: Meta
      /** 子路由列表 */
      children?: RouteVO[]
    }
    /** Meta，路由属性 */
    interface Meta {
      /** 路由title */
      title?: string
      /** 菜单是否隐藏(true-是 false-否) */
      hidden?: boolean
      /** ICON */
      icon?: string
      /** 【菜单】是否开启页面缓存 */
      keepAlive?: boolean
      // isAffix?: boolean
      // isLink?: string
      isFull?: boolean
      /** 【目录】只有一个子路由是否始终显示 */
      alwaysShow?: boolean
    }
    /** 菜单查询参数 */
    interface MenuQuery {
      /** 搜索关键字 */
      keywords?: string
    }
    /** 菜单视图对象 */
    interface MenuVO {
      /** 子菜单 */
      children?: MenuVO[]
      /** 组件路径 */
      component?: string
      /** ICON */
      icon?: string
      /** 菜单ID */
      id?: number
      /** 菜单名称 */
      name?: string
      /** 父菜单ID */
      parentId?: number
      /** 按钮权限标识 */
      perm?: string
      /** 跳转路径 */
      redirect?: string
      /** 路由名称 */
      routeName?: string
      /** 路由相对路径 */
      routePath?: string
      /** 菜单排序(数字越小排名越靠前) */
      sort?: number
      /** 菜单 */
      type?: MenuTypeEnum
      /** 菜单是否可见(1:显示;0:隐藏) */
      visible?: number
    }
    /** 菜单表单对象 */
    interface MenuForm {
      /** 菜单ID */
      id?: string
      /** 父菜单ID */
      parentId?: number
      /** 菜单名称 */
      name?: string
      /** 菜单是否可见(1-是 0-否) */
      visible: number
      /** ICON */
      icon?: string
      /** 排序 */
      sort?: number
      /** 路由名称 */
      routeName?: string
      /** 路由路径 */
      routePath?: string
      /** 组件路径 */
      component?: string
      /** 跳转路由路径 */
      redirect?: string
      /** 菜单 */
      type?: MenuTypeEnum
      /** 权限标识 */
      perm?: string
      /** 【菜单】是否开启页面缓存 */
      keepAlive?: number
      /** 【目录】只有一个子路由是否始终显示 */
      alwaysShow?: number
      /** 参数 */
      params?: KeyValue[]
    }
    interface KeyValue {
      key: string
      value: string
    }
  }
}
export {}
