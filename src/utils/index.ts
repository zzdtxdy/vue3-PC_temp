import { TOKEN_KEY } from '@/enums/CacheEnum'
/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.RouteVO[]): Menu.RouteVO[] {
  const newMenuList: Menu.RouteVO[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 hidden == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu.RouteVO[]) {
  const newMenuList: Menu.RouteVO[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.hidden
  })
}

export function clearToken() {
  localStorage.setItem(TOKEN_KEY, '')
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
