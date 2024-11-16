/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-04 12:10:25
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-25 21:41:58
 * @FilePath: \vue3-PC_temp\src\utils\nprogress.ts
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 进度条
NProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: true,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3
})

export default NProgress
