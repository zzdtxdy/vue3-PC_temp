/*
 * @Description: 按钮权限、角色权限
 * @Author: zhongzd
 * @Date: 2024-08-04 11:43:07
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-03-23 11:41:38
 * @FilePath: \vue3-PC_temp\src\directive\permission\index.ts
 */
import { useAuthStoreHook } from '@/stores/modules/auth'
import { Directive, DirectiveBinding } from 'vue'

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const requiredPerms = binding.value

  if (!requiredPerms || (typeof requiredPerms !== 'string' && !Array.isArray(requiredPerms))) {
    throw new Error(
      "需要提供权限标识！例如：v-has-perm=\"'sys:user:add'\" 或 v-has-perm=\"['sys:user:add', 'sys:user:edit']\""
    )
  }

  const { roles, perms } = useAuthStoreHook()

  // 超级管理员拥有所有权限
  if (roles.includes('ROOT')) {
    return
  }

  const hasAuth = Array.isArray(requiredPerms)
    ? requiredPerms.some((perm) => perms.includes(perm))
    : perms.includes(requiredPerms)
  // 如果没有权限，移除该元素 && removeChild 方法必须在父节点上调用，用于移除父节点的子节点
  if (!hasAuth && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

/**
 * 角色权限指令
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkRole(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkRole(el, binding)
  }
}

function checkRole(el: HTMLElement, binding: DirectiveBinding) {
  const requiredRoles = binding.value

  // 校验传入的角色值是否合法
  if (!requiredRoles || (typeof requiredRoles !== 'string' && !Array.isArray(requiredRoles))) {
    throw new Error(
      "需要提供角色标识！例如：v-has-role=\"'ADMIN'\" 或 v-has-role=\"['ADMIN', 'TEST']\""
    )
  }

  const { roles } = useAuthStoreHook()

  // 检查是否有对应角色权限
  const hasAuth = Array.isArray(requiredRoles)
    ? requiredRoles.some((role) => roles.includes(role))
    : roles.includes(requiredRoles)

  // 如果没有权限，移除元素
  if (!hasAuth && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}
