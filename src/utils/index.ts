/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-14 09:53:23
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-14 09:53:44
 * @FilePath: \zzd\vue3-PC_temp\src\utils\index.ts
 */

import { TOKEN_KEY } from '@/enums/CacheEnum'

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.RouteVO[]): Menu.RouteVO[] {
  let newMenuList: Menu.RouteVO[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 hidden == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu.RouteVO[]) {
  let newMenuList: Menu.RouteVO[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.hidden
  })
}

export function clearToken() {
  localStorage.setItem(TOKEN_KEY, '')
}
