import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 导入 Node.js 的 `path` 模块，用于处理和转换文件路径
import path from 'path'
// 定义一个名为 `resolve` 的函数，用于解析相对路径并返回绝对路径
// 参数 `dir` 是一个字符串，表示要解析的目录
const resolve = (dir: string): string => {
  // 使用 `path.join` 方法将当前文件的目录 (`__dirname`) 与给定的目录 (`dir`) 连接起来
  // 结果是一个绝对路径
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 需要导入的内容自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router'],
      //配置文件生成位置，默认是根目录 /auto-imports.d.ts
      dts: 'src/auto-import.d.ts',
      // 自动导入element相关函数，如：ElMessage, ElMessageBox..
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      // 自动导入element相关组件
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      comps: resolve('src/components'), // comps表示当前的src目录路径下components
      apis: resolve('src/apis'), // apis表示当前的src目录路径下apis
      views: resolve('src/views'),
      utils: resolve('src/utils'),
      routes: resolve('src/routes'),
      'yaml-parser': 'yaml-loader/dist/cjs.js'
    }
  }
})
