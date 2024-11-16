// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'wh-full': 'w-full h-full',
    'flex-x-between': 'flex items-center justify-between',
    'flex-x-end': 'flex items-center justify-end',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-rt': 'absolute right-0 top-0 ',
    'fixed-lt': 'fixed left-0 top-0'
  },
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      primary_dark: 'var(--el-color-primary-light-5)'
    }
  },
  presets: [
    presetUno(), //  UnoCSS 的核心预设，继承preset-wind和preset-mini两个预设包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等
    presetAttributify(), // 允许使用类似 HTML 属性的方式添加样式。
    presetIcons(), // 提供图标支持，你可以通过类名直接使用图标。
    presetTypography(), // 提供了一组预定义的排版样式。
    // 允许你直接从 Google Fonts 等引入字体。
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  // 使你可以在 CSS 中使用 UnoCSS 的指令。& 允许你将多个变体组合在一个类名中，减少重复代码。
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
