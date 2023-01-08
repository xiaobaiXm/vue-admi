import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from '@/stores'
import { registerGlobComponents } from '@/components'
import { setupGlobDirectives } from '@/directives'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupI18n } from '@/locales/setupI18n'
import 'ant-design-vue/dist/antd.css'

async function bootstrap(): Promise<void> {
  const app = createApp(App)
  // 配置内部系统
  initAppConfigStore()
  // 配置 store
  setupStore(app)
  // 配置 路由
  setupRouter(app)
  // 配置路由守卫
  setupRouterGuard(router)
  // 注册全局组件
  registerGlobComponents(app)
  // 注册全局指令
  setupGlobDirectives(app)
  // 配置多语言
  await setupI18n(app)
  app.mount('#app')
}

bootstrap()
