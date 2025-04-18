/*
 * @Description: 
 * @Author: zhongzd
 * @Date: 2024-07-06 21:04:59
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-06 16:21:24
 * @FilePath: \vue3-PC_temp\.prettierrc.cjs
 */
module.exports = {
  printWidth: 100, // 单行输出（不折行）的（最大）长度
  tabWidth: 2, // 每个缩进级别的空格数
  tabs: false, // 使用制表符 (tab) 缩进行而不是空格 (space)
  semi: false, // 是否在语句末尾打印分号
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 是否在对象属性添加空格
  htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号
  useTabs: false, // 不使用缩进符，而使用空格
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  proseWrap: 'preserve', // "always" - 超出长度自动折行"never" - 用不折行"preserve" - 遵循原有格式. v1.9.0 及以上支持
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto',
  'max-lines-per-function': [2, { max: 320, skipComments: true, skipBlankLines: true }] // 每个函数最大行数
}
