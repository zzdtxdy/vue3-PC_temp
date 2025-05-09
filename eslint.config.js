/*
 * @Description: ESLint 配置文件，用于定义代码检查规则
 * @Author: zhongzd
 * @Date: 2024-07-06 21:04:59
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 21:05:04
 * @FilePath: \vue3-PC_temp\eslint.config.js
 */
// 导入 ESLint 配置所需的模块和插件
import globals from 'globals' // 提供浏览器和 Node.js 的全局变量
import pluginJs from '@eslint/js' // JavaScript 规则
import pluginVue from 'eslint-plugin-vue' // Vue 规则
import pluginTypeScript from '@typescript-eslint/eslint-plugin' // TypeScript 规则

import parserVue from 'vue-eslint-parser' // Vue 解析器，为 Vue 文件提供语法检查和规则支持
import parserTypeScript from '@typescript-eslint/parser' // TypeScript 解析器

import configPrettier from 'eslint-config-prettier' // 禁用与 Prettier 冲突的规则
import pluginPrettier from 'eslint-plugin-prettier' // 将 Prettier 的规则设置到 ESLint 的规则中

// 解析自动导入配置
import fs from 'fs'
// 读取自动导入的 ESLint 配置
const autoImportConfig = JSON.parse(fs.readFileSync('.eslintrc-auto-import.json', 'utf-8'))

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 指定检查文件和忽略文件
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'], // 检查所有 JavaScript、TypeScript 和 Vue 文件
    ignores: ['**/*.d.ts'] // 忽略所有 .d.ts 类型声明文件
  },
  // 全局配置
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器全局变量
        ...globals.node, // Node.js 全局变量
        ...autoImportConfig.globals, // 自动导入的全局变量
        ...{
          defineProps: 'readonly', // Vue 3 的 defineProps 辅助函数
          defineEmits: 'readonly', // Vue 3 的 defineEmits 辅助函数
          defineExpose: 'readonly', // Vue 3 的 defineExpose 辅助函数
          withDefaults: 'readonly', // Vue 3 的 withDefaults 辅助函数
          defineStore: 'readonly', // 声明 defineStore 为全局变量
          OptionType: 'readonly', // 选项类型辅助函数
          Menu: 'readonly' // 声明 Menu 为全局变量，且只读
        }
      }
    },
    // Prettier 插件配置
    plugins: { prettier: pluginPrettier },
    // 规则配置
    rules: {
      ...configPrettier.rules, // 关闭与 Prettier 冲突的规则
      ...pluginPrettier.configs.recommended.rules, // 启用 Prettier 推荐规则
      'prettier/prettier': 'error', // 将 Prettier 格式化问题视为错误
      'no-unused-vars': [
        // 未使用变量规则
        'warn',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
          varsIgnorePattern: '^[A-Z0-9_]+$', // 忽略全大写的变量（通常是枚举）
          ignoreRestSiblings: true // 忽略解构赋值中未使用的同级变量
        }
      ],
      'no-undef': 'off' // 关闭未定义变量检查
    }
  },
  // JavaScript 推荐规则
  pluginJs.configs.recommended,

  // TypeScript 配置
  {
    files: ['**/*.ts'], // 针对所有 TypeScript 文件
    ignores: ['**/*.d.ts'], // 忽略类型声明文件
    languageOptions: {
      parser: parserTypeScript, // 使用 TypeScript 解析器
      parserOptions: {
        sourceType: 'module' // 支持 ES 模块
      }
    },
    plugins: { '@typescript-eslint': pluginTypeScript }, // TypeScript 插件
    rules: {
      ...pluginTypeScript.configs.strict.rules, // 启用 TypeScript 严格规则
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-empty-object-type': 'off', // 允许空对象类型
      '@typescript-eslint/no-unused-vars': 'warn', // 将未使用变量规则改为警告级别
      '@typescript-eslint/no-undef': 'off' // 关闭 TypeScript 的未定义变量检查
    }
  },

  // Vue 配置
  {
    files: ['**/*.vue'], // 针对所有 Vue 文件
    languageOptions: {
      parser: parserVue, // 使用 Vue 解析器
      parserOptions: {
        parser: parserTypeScript, // 在 <script> 标签中使用 TypeScript 解析器
        sourceType: 'module' // 支持 ES 模块
      }
    },
    plugins: { vue: pluginVue, '@typescript-eslint': pluginTypeScript }, // Vue 和 TypeScript 插件
    processor: pluginVue.processors['.vue'], // Vue 文件处理器
    rules: {
      ...pluginVue.configs.recommended.rules, // Vue 推荐规则
      'vue/no-v-html': 'off', // 允许使用 v-html 指令
      'vue/multi-word-component-names': 'off' // 允许单单词组件名
    }
  }
]
