import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'
import { generateModifyVars } from './build/generate/generateModifyVars'
import { createVitePlugins } from './build/vite/plugin'
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YY-MM-DD HH:mm:ss')
}
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      https: true,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US'
      ]
    }
  }
}
