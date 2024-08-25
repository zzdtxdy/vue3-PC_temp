import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import pxtovw from 'postcss-px-to-viewport-8-plugin'
// 体积分析
import { visualizer } from 'rollup-plugin-visualizer'
// 配置压缩
import viteCompression from 'vite-plugin-compression'
// cdn
import externalGlobals from 'rollup-plugin-external-globals'
import { createHtmlPlugin } from 'vite-plugin-html'
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
// externals cdn此处配置不打包
const cdn = {
  css: [
    // 'https://cdn.jsdelivr.net/npm/element-plus@2.7.8/dist/index.min.css'
  ],
  js: [
    // 'https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.min.js'
    // 'https://cdn.jsdelivr.net/npm/element-plus@2.7.8/dist/index.full.min.js'
    'https://cdn.bootcdn.net/ajax/libs/echarts/5.5.0/echarts.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/axios/1.7.2/axios.min.js'
  ]
}
//不打包依赖
const externalGlobalsObj = {
  // 'global variable name': 'module id'
  echarts: 'echarts'
  // axios: 'axios'
  // 'element-plus': 'ElementPlus'
}
/* px to vw */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  unitToConvert: 'px', // 需要转换的单位，默认为"px"
  viewportWidth: 1920, // 设计稿的视口宽度
  unitPrecision: 5, // 单位转换后保留的精度
  propList: ['*'], // 能转化为vw的属性列表
  viewportUnit: 'vw', // 希望使用的视口单位
  fontViewportUnit: 'vw', // 字体使用的视口单位
  selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: false, // 是否转换媒体查询中设置的属性值
  replace: true, //  则原始的px单位将被vw单位替换，而不是在CSS中同时保留两者
  exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
  landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  landscapeUnit: 'vw', // 横屏时使用的单位
  landscapeWidth: 1920 // 横屏时使用的视口宽度
})
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const isProduction = mode === 'production'
  // 用于在 Vite 项目中加载环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    base: '/',
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
      }),
      // 支持svg
      createSvgIconsPlugin({
        // 指定插件应该扫描的目录，从中查找 SVG 文件
        iconDirs: [path.resolve(pathSrc, 'assets/icons')],
        // 指定symbolId格式 src/icons/settings.svg 将生成 <symbol id="icon-settings">它在 icons 根目录下，没有子目录，所以 dir 部分为空
        symbolId: 'icon-[dir]-[name]'
      }),
      // 打包体积预览
      visualizer({
        gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
        brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
        emitFile: true, //在打包完的dist，否则在项目目录下
        filename: 'stats.html', //分析图生成的文件名
        open: true //如果存在本地服务端口，将在打包后自动展示
      }),
      // cdn 排除打包
      {
        ...externalGlobals(externalGlobalsObj), //不打包依赖
        enforce: 'post', //指定这个插件应该在所有其他插件之后执行
        apply: 'build' //指定这个插件只在构建阶段应用，而不是在开发服务器阶段
      },
      // cdn插入html
      createHtmlPlugin({
        //指定哪些内容需要被注入到生成的HTML文件中
        inject: {
          data: {
            cdnCss: isProduction ? cdn.css : [],
            cdnJs: isProduction ? cdn.js : []
          }
        }
      }),
      // gizp
      viteCompression({
        verbose: true, //是否在控制台输出压缩结果
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz' //文件类型
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
      // CSS 预处理器 这个配置项允许你定义 CSS 预处理器（如 SCSS、Sass、Less 等）的特定选项
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true, // 否允许在 SCSS 文件中使用 JavaScript 表达式
          // 在每个 SCSS 文件自动引入 @/styles/var.scss 文件，并将其中的所有变量、mixin 等作为全局可用的
          additionalData: `
          @use "@/styles/var.scss" as *;
          @import "@/styles/utils.scss";
        `
        }
      },
      postcss: {
        plugins: [
          // px to vw
          // loder_pxtovw
        ]
      }
    },
    // esbuild: {
    //   legalComments: 'none', // 删除注释
    //   drop: ['console', 'debugger'] // 删除 所有的console 和 debugger和注释
    // },
    // 构建配置
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      // 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild' ,默认为esbuild
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
          //   vue: ['vue', 'vue-router', 'pinia', 'axios']
          // },
          /* 分包 */
          manualChunks: (id) => {
            // 这个ID，就是所有文件的绝对路径
            if (id.includes('node_modules')) {
              // 因为 node_modules 中的依赖通常是不会改变的
              // 所以直接单独打包出去
              // 这个return 的值就是打包的名称
              return 'vendor'
            }
          },
          /* 分类 */
          // 用于从入口点(main.ts)创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
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
        },
        external: Object.keys(externalGlobalsObj)
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
