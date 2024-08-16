// https://cn.vitejs.dev/guide/env-and-mode

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// TypeScript 类型提示都为 string： https://github.com/vitejs/vite/issues/6930
// 这些环境变量通常在项目根目录的 .env 文件中定义，并以 VITE_ 前缀开头，这是 Vite 识别环境变量的方式。
interface ImportMetaEnv {
  VITE_GLOB_APP_TITLE: any
  /** 应用端口 */
  VITE_APP_PORT: number
  /** API 基础路径(代理前缀) */
  VITE_APP_BASE_API: string
  /** API 地址 */
  VITE_APP_API_URL: string
  /** 是否开启 Mock 服务 */
  VITE_MOCK_DEV_SERVER: boolean
}
// ImportMeta 接口扩展了 JavaScript 的原生 import.meta 对象，使其包含一个 env 属性。env 属性的类型为 ImportMetaEnv，这样你就可以在代码中类型安全地访问环境变量。
interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示
 */
declare const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    engines: {
      node: string
    }
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  buildTimestamp: number
}
