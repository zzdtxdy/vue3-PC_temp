/*
 * @Description: 通用工具
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-04 12:48:49
 * @FilePath: \vue3-PC_temp\src\utils\index.ts
 */
/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.RouteVO[]): Menu.RouteVO[] {
  const newMenuList: Menu.RouteVO[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu.RouteVO[]) {
  const newMenuList: Menu.RouteVO[] = structuredClone(menuList)
  return newMenuList.filter((item) => {
    if (item.children?.length) {
      item.children = getShowMenuList(item.children)
    }
    return !item.meta?.isHide
  })
}

/**
 * @description: 修改颜色的alpha
 * @param {string} hex 输入#fffff
 * @param {number} alpha 透明度0-1
 * @return {*} rgba(51, 102, 153, 0.75)
 */
export function modifyAlpha(hex: string, alpha: number) {
  // 验证十六进制颜色值
  if (!/^#([0-9a-fA-F]{3}){1,2}$/.test(hex)) {
    throw new Error('Invalid hex color format')
  }

  // 处理简短的十六进制颜色值 #fff 转 #ffffff
  if (hex.length === 4) {
    hex = hex.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/, '#$1$1$2$2$3$3')
  }

  // 提取RGB值 16进制转10
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // 验证alpha值
  if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
    throw new Error('Alpha value must be a number between 0 and 1')
  }

  // 返回RGBA字符串
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})` // 使用toFixed(2)来格式化alpha值为两位小数
}
/**
 * @description 获取浏览器默认语言
 * @returns {string} 浏览器默认语言代码
 */
export function getBrowserLang(): string {
  const browserLang = navigator.language || ''
  let defaultBrowserLang = ''
  if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = 'zh-cn'
  } else {
    // 其他语言默认返回 'en'
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
  const timeNow = new Date()
  const hours = timeNow.getHours()
  if (hours >= 6 && hours <= 11) return `早上好 ⛅`
  if (hours >= 11 && hours <= 13) return `中午好 🌞`
  if (hours >= 13 && hours <= 18) return `下午好 🌞`
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`
}

/**
 * @description: 是否为移动端
 * @return {*} true 时 false 否
 */
export function isMobile() {
  const userAgentInfo = navigator.userAgent
  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  const mobileFlag = mobileAgents.some((mobileAgent) => {
    return userAgentInfo.indexOf(mobileAgent) > 0
  })

  return mobileFlag
}

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @returns {void}
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @returns {void}
 */
export function localClear() {
  window.localStorage.clear()
}

/**
 * @description 判断数据类型
 * @param {*} val 需要判断类型的数据
 * @returns {String}
 */
export function isType(val: any) {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description: 判断两个对象是否相等
 * @param {any} obj1
 * @param {any} obj2
 * @return {boolean}
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

/**
 * 判断是否是外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

/**
 * 切换浅色主题下的侧边栏颜色方案
 *
 * @param isBlue 布尔值，表示是否开启深蓝色侧边栏颜色方案
 */
export function toggleSidebarColor(isBuleSidebar: boolean) {
  if (isBuleSidebar) {
    document.documentElement.classList.add('sidebar-color-blue')
  } else {
    document.documentElement.classList.remove('sidebar-color-blue')
  }
}
