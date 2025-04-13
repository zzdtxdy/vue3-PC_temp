/*
 * @Description: LayoutEnum
 * @Author: zhongzd
 * @Date: 2024-08-03 09:37:22
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-24 17:14:48
 * @FilePath: \vue3-PC_temp\src\enums\settings\LayoutEnum.ts
 */
/**
 * 菜单布局枚举
 */
export const enum LayoutEnum {
  /**
   * 左侧菜单布局
   */
  LEFT = 'left',
  /**
   * 顶部菜单布局
   */
  TOP = 'top',

  /**
   * 混合菜单布局
   */
  MIX = 'mix'
}

/**
 * 侧边栏状态枚举
 */
export const enum SidebarStatus {
  /**
   * 展开
   */
  OPENED = 'opened',

  /**
   * 关闭
   */
  CLOSED = 'closed'
}

/**
 * 组件尺寸枚举
 */
export const enum ComponentSize {
  /**
   * 默认
   */
  DEFAULT = 'default',

  /**
   * 大型
   */
  LARGE = 'large',

  /**
   * 小型
   */
  SMALL = 'small'
}
