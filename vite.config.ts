import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// 导入 Node.js 的 `path` 模块，用于处理和转换文件路径
import path from 'path'
// 定义一个名为 `resolve` 的函数，用于解析相对路径并返回绝对路径
// __dirname：是node的一个全局变量，获得当前文件所在目录的完整目录名，搭配path一起使用
// 参数 `dir` 是一个字符串，表示要解析的目录
const resolvePath = (dir: string): string => path.resolve(__dirname, dir)
// 用于解析相对路径并返回绝对路径
const pathSrc = resolvePath('src')

import { name, version, engines, dependencies, devDependencies } from './package.json'
/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now()
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 用于在 Vite 项目中加载环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      // 允许IP访问
      host: '0.0.0.0',
      // 应用端口 (默认:3000)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /** 代理前缀为 /dev-api 的请求  */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 接口地址
          target: env.VITE_APP_API_URL,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    // 配置 Vite 插件
    plugins: [
      vue(),
      // jsx、tsx语法支持
      vueJsx(),
      AutoImport({
        // 需要导入的内容自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'pinia', 'vue-router', 'vue-i18n'],
        // 自动导入element相关函数，如：ElMessage, ElMessageBox..
        resolvers: [
          ElementPlusResolver(), // 自动导入图标组件
          IconsResolver({})
        ],
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          enabled: false,
          // 指定自动导入函数 eslint 规则的文件
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        //配置文件生成位置，默认是根目录 /auto-imports.d.ts
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts') // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        // 自动导入element相关组件
        resolvers: [
          ElementPlusResolver(), // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          })
        ],
        dts: path.resolve(pathSrc, 'types', 'components.d.ts') // 指定自动导入组件TS类型声明文件路径
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true
      })
    ],
    // 配置模块解析相关选项
    resolve: {
      alias: {
        '@': pathSrc,
        comps: resolvePath('src/components'), // comps表示当前的src目录路径下components
        api: resolvePath('src/api'), // apis表示当前的src目录路径下api
        views: resolvePath('src/views'),
        utils: resolvePath('src/utils'),
        route: resolvePath('src/route')
      }
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          // 你可以在项目的任何地方（包括组件的<style>标签中）直接使用variables.scss中定义的变量，而无需在每个组件中单独引入该文件。
          additionalData: `
          @use "@/styles/variables.scss" as *;
        `
        }
      }
    },
    // 构建配置
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        },
        format: {
          comments: false // 删除注释
        }
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          //   "vue-i18n": ["vue-i18n"],
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split('.')
            let extType = info[info.length - 1]
            // console.log('文件信息', assetInfo.name)
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'media'
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img'
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts'
            }
            return `${extType}/[name].[hash].[ext]`
          }
        }
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
