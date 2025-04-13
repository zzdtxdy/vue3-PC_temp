/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-08-03 09:37:22
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-24 17:07:53
 * @FilePath: \vue3-PC_temp\src\enums\api\ResultEnum.ts
 */
/**
 * 响应码枚举
 */
export const enum ResultEnum {
  /**
   * 成功
   */
  SUCCESS = '00000',
  /**
   * 错误
   */
  ERROR = 'B0001',

  /**
   * 访问令牌无效或过期
   */
  ACCESS_TOKEN_INVALID = 'A0230',

  /**
   * 刷新令牌无效或过期
   */
  REFRESH_TOKEN_INVALID = 'A0231'
}
