<!--
 * @Description: 登录
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-01-09 15:18:28
 * @FilePath: \vue3-PC_temp\src\views\login\index.vue
-->
<template>
  <div class="login-container">
    <!-- 顶部工具栏 -->
    <div class="top-bar">
      <SwitchDark />
      <langSelect class="ml-2 cursor-pointer" @reset-form="resetForm" />
    </div>
    <div class="login-form">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <div class="form-title">
          <h2>{{ defaultSettings.title }}</h2>
          <el-dropdown style="position: absolute; right: 0">
            <div class="cursor-pointer">
              <el-icon>
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-tag>{{ defaultSettings.version }}</el-tag>
                </el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('root', '123456')">超级管理员：root/123456</el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('admin', '123456')">系统管理员：admin/123456</el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('test', '123456')">测试小游客：test/123456</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="User" size="large" :placeholder="$t('login.username')" />
        </el-form-item>
        <el-tooltip :visible="isCapslock" :content="$t('login.capsLock')" placement="right">
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              size="large"
              :placeholder="$t('login.password')"
              type="password"
              name="password"
              show-password
              @keyup="checkCapslock"
              @keyup.enter="handleLoginSubmit"
            />
          </el-form-item>
        </el-tooltip>
        <!-- 验证码 -->
        <el-form-item class="flex" prop="captchaCode">
          <div class="input-wrapper">
            <el-input
              v-model="loginForm.captchaCode"
              auto-complete="off"
              class="flex-1"
              :prefix-icon="Lock"
              size="large"
              :placeholder="$t('login.captchaCode')"
              @keyup.enter="handleLoginSubmit"
            />
            <el-image :src="captchaBase64" class="captcha-image" @click="getCaptcha" />
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-button :loading="loading" type="primary" size="large" class="w-full" @click.prevent="handleLoginSubmit">
          {{ $t('login.login') }}
        </el-button>
        <!-- 第三方登录 -->
        <el-divider>
          <el-text size="small">{{ $t('login.otherLoginMethods') }}</el-text>
        </el-divider>
        <div class="third-party-login">
          <svg-icon name="wechat" class="icon" />
          <svg-icon name="qq" class="icon" />
          <svg-icon name="github" class="icon" />
          <svg-icon name="gitee" class="icon" />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthAPI, { LoginData } from '@/api/auth'
import { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import { getTimeState } from '@/utils'
import { LocationQuery } from 'vue-router'
import defaultSettings from '@/settings'
// pinia
const userStore = useUserStore()
// 国际化 Internationalization
const { t } = useI18n()
const route = useRoute()

// 登录表单ref
const loginFormRef = ref<FormInstance>()
// 验证码图片Base64字符串
const captchaBase64 = ref()
const loginForm = ref<LoginData>({
  username: 'admin',
  password: '123456',
  captchaKey: '',
  captchaCode: ''
})
onMounted(() => {
  getCaptcha()
})
const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: 'blur',
        message: t('login.message.username.required')
      }
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: t('login.message.password.required')
      },
      {
        min: 6,
        message: t('login.message.password.min'),
        trigger: 'blur'
      }
    ],
    captchaCode: [
      {
        required: true,
        trigger: 'blur',
        message: t('login.message.captchaCode.required')
      }
    ]
  }
})
/* 重置表单校验 */
const resetForm = () => {
  console.log(loginFormRef)

  loginFormRef.value?.resetFields()
}
// 按钮 loading 状态
const loading = ref(false)
/** 获取验证码 */
const getCaptcha = () => {
  AuthAPI.getCaptcha().then((data) => {
    loginForm.value.captchaKey = data.captchaKey
    captchaBase64.value = data.captchaBase64
  })
}
/** 登录表单提交 */
const handleLoginSubmit = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginForm.value)
        .then(() => {
          const { path, queryParams } = parseRedirect()
          ElNotification({
            title: getTimeState(),
            type: 'success',
            duration: 1000
          })
          router.push({ path: path, query: queryParams })
        })
        .catch(() => {
          getCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
/**
 * 解析 redirect 字符串 为 path 和  queryParams
 *
 * @returns { path: string, queryParams: Record<string, string> } 解析后的 path 和 queryParams
 */
function parseRedirect(): {
  path: string
  queryParams: Record<string, string>
} {
  const query: LocationQuery = route.query
  const redirect = (query.redirect as string) ?? '/'

  const url = new URL(redirect, window.location.origin)
  const path = url.pathname
  const queryParams: Record<string, string> = {}

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  return { path, queryParams }
}

const isCapslock = ref(false) // 是否大写锁定
// 检查输入大小写
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState('CapsLock')
  }
}

// 设置登录凭证
const setLoginCredentials = (username: string, password: string) => {
  loginForm.value.username = username
  loginForm.value.password = password
}
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url('https://picsum.photos/2560/1440') no-repeat;
  background-size: cover;
  .top-bar {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
  }
  .login-form {
    width: 400px;
    padding: 50px 40px 45px;
    background-color: var(--el-bg-color-overlay);
    border-radius: 15px;
    box-shadow: var(--el-box-shadow);

    @media (width <= 640px) {
      width: 340px;
    }
    .form-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 20px;
      text-align: center;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .captcha-image {
      height: 48px;
      margin-left: $spacing-sm;
      cursor: pointer;
    }
    .third-party-login {
      display: flex;
      justify-content: center;
      width: 100%;
      color: var(--el-text-color-secondary);
      *:not(:first-child) {
        margin-left: 20px;
      }
      .icon {
        cursor: pointer;
      }
    }
  }
}
html.dark .login-container {
  background: url('@/assets/images/login-background-dark.webp') no-repeat center right;
}
</style>
