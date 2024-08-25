import i18n from '@/lang/index'

/**
 * @description: 翻译路由的 meta.title，如果没有对应的翻译，将返回原始的 title。
 * @param {string} title - 路由的 meta.title
 * @return {string} 翻译后的标题或原始标题
 */
export function translateRouteTitle(title: string): string {
  const translationKey = `route.${title}`
  const _t: any = i18n.global

  // 如果存在对应的国际化配置，返回翻译后的标题
  if (_t.te(translationKey)) {
    return _t.t(translationKey)
  }

  // 否则返回原始的标题
  return title
}
