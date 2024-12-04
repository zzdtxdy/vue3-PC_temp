<!--
 * @Description: 登录
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-11-27 16:35:14
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
      <div class="flex-x-end"></div>
      <div class="i-mdi-alarm"></div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="User" size="large" :placeholder="$t('login.username')" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :prefix-icon="Lock" size="large" :placeholder="$t('login.password')" />
        </el-form-item>
        <!-- 验证码 -->
        <!-- <el-form-item class="flex" prop="captchaCode">
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
        </el-form-item> -->
        <!-- 登录按钮 -->
        <el-button :loading="loading" type="primary" size="large" class="w-full" @click.prevent="handleLoginSubmit">
          {{ $t('login.login') }}
        </el-button>
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
  username: 'landon1',
  password: 'a1234567'
  // captchaKey: '',
  // captchaCode: ''
})
onMounted(() => {
  // getCaptcha()
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
    ]
    // captchaCode: [
    //   {
    //     required: true,
    //     trigger: 'blur',
    //     message: t('login.message.captchaCode.required')
    //   }
    // ]
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
          // getCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
/** 解析 redirect 字符串 为 path 和  queryParams */
const parseRedirect = () => {
  const query = route.query
  const redirect = (query.redirect as string) ?? '/'

  const url = new URL(redirect, window.location.origin) // window.location.origin(协议 + 域名| IP + 端口)
  const path = url.pathname
  const queryParams: Record<string, string> = {}

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  return { path, queryParams }
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
  }
}
html.dark .login-container {
  background: url('@/assets/images/login-background-dark.webp') no-repeat center right;
}
</style>
