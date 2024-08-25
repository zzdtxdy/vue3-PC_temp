<!--
 * @Description: 登录
 * @Author: zhongzd
 * @Date: 2024-08-16 20:10:27
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-08-24 21:59:22
 * @FilePath: \vue3-PC_temp\src\views\login\index.vue
-->
<template>
  <div class="login-container">
    <div class="top-bar"></div>
    <div class="login-form">
      <el-card>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username" required>
            <el-input v-model="loginForm.username" :prefix-icon="User" size="large" :placeholder="$t('login.username')" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" size="large" :placeholder="$t('login.password')" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginData } from '@/api/auth'
import { FormInstance } from 'element-plus'
import { User } from '@element-plus/icons-vue'
// 国际化 Internationalization
const { t } = useI18n()

// 登录表单ref
const loginFormRef = ref<FormInstance>()

const loginForm = ref<LoginData>({
  username: 'admin',
  password: '123456',
  captchaKey: '',
  captchaCode: ''
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
  .login-form {
    width: 400px;

    @media (width <= 640px) {
      width: 340px;
    }
  }
}
html.dark .login-container {
  background: url('@/assets/images/login-background-dark.webp') no-repeat center right;
}
</style>
