// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from '@/lang/index'

/**
 * @description: 翻译路由的 meta.title，如果没有对应的翻译，它将返回原始的 title。
 * @param {any} title
 * @return {*}
 * @author: zhongzd
 */
export function translateRouteTitle(title: any) {
  // 判断是否存在国际化配置，如果没有原生返回
  // te 检查是否存在以 "route." + title 为键的翻译
  const hasKey = i18n.global.te('route.' + title)
  if (hasKey) {
    // i18n.global.t 获取翻译后的文本
    const translatedTitle = i18n.global.t('route.' + title)
    return translatedTitle
  }
  return title
}
