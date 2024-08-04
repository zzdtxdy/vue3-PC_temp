/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-04 11:43:07
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-04 12:02:37
 * @FilePath: \项目\vue3-PC_temp\src\directive\index.ts
 */
import type { App } from 'vue'

import { hasPerm } from './permission'

const directivesList: any = {
  // 自定义指令
  hasPerm
}

export function setupDirective(app: App<Element>) {
  Object.keys(directivesList).forEach((key) => {
    // 注册所有自定义指令
    app.directive(key, directivesList[key])
  })
}
