/*
 * @Description: 按钮权限、角色权限
 * @Author: zhongzd
 * @Date: 2024-08-04 11:43:07
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 17:50:21
 * @FilePath: \vue3-PC_temp\src\directive\permission\index.ts
 */
import { useAuthStoreHook } from '@/store/modules/auth'
import { Directive, DirectiveBinding } from 'vue'

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // DOM绑定需要的按钮权限标识 // value 获取用户使用自定义指令绑定的内容
    const { value: requiredPerms } = binding
    if (requiredPerms) {
      if (!useAuthStoreHook().hasAuth(requiredPerms)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\"")
    }
  }
}

/**
 * 角色权限
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // DOM绑定需要的角色编码 // value 获取用户使用自定义指令绑定的内容
    const { value: requiredRoles } = binding
    if (requiredRoles) {
      if (!useAuthStoreHook().hasAuth(requiredRoles, 'role')) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"")
    }
  }
}
