/*
 * @Description:
 * @Author: zhongzd
 * @Date: 2024-07-06 21:04:59
 * @LastEditors: zhongzd
 * @LastEditTime: 2024-10-01 18:49:23
 * @FilePath: \vue3-PC_temp\.eslintrc.cjs
 */
module.exports = {
  // 设置 ESLint 的根目录
  root: true,

  // 指定环境：浏览器、Node.js 和 ES2021
  env: {
    browser: true, // 允许使用浏览器全局变量
    node: true, // 允许使用 Node.js 全局变量和 Node.js 作用域
    es2021: true // 启用 ES2021 语法支持
  },

  // 使用 vue-eslint-parser 解析 .vue 文件
  parser: 'vue-eslint-parser',

  // 继承的规则集合
  extends: [
    'eslint:recommended', // 使用 ESLint 推荐的规则
    'plugin:vue/vue3-recommended', // 使用 Vue 3 推荐的规则
    './.eslintrc-auto-import.json', // 自动导入函数 eslint 规则引入
    'plugin:@typescript-eslint/recommended', // 使用 TypeScript 推荐的规则
    'plugin:prettier/recommended', // 使用 Prettier 推荐的规则，禁用与 Prettier 冲突的 ESLint 规则
    'prettier' // eslint-config-prettier 的缩写，确保 Prettier 的规则优先
  ],

  // 解析器选项
  parserOptions: {
    ecmaVersion: 'latest', // 支持最新的 ECMAScript 版本
    parser: '@typescript-eslint/parser', // 使用 @typescript-eslint/parser 解析 TypeScript
    sourceType: 'module', // 支持 ECMAScript 模块
    ecmaFeatures: {
      jsx: true // 允许解析 JSX
    }
  },

  // 使用的插件
  plugins: [
    'vue', // 支持 Vue.js 规则
    '@typescript-eslint', // 支持 TypeScript 规则
    'prettier' // 支持 Prettier 规则
  ],

  // 自定义规则
  rules: {
    // 关闭 no-undef 规则
    'no-undef': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
    'vue/multi-word-component-names': 0, // 不强制要求组件命名 解决：index.vue组件命名问题（组件名称不合规范）
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'vue/attribute-hyphenation': 'off'
  },
  // 全局变量
  globals: {
    defineProps: 'readonly', // 定义组件 props 的辅助函数
    defineEmits: 'readonly', // 定义组件 emits 的辅助函数
    defineExpose: 'readonly', // 定义组件 expose 的辅助函数
    withDefaults: 'readonly', // 定义 props 默认值的辅助函数
    OptionType: 'readonly'
  }
}
