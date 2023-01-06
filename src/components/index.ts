import type { App } from 'vue'
import { Input, Layout } from 'ant-design-vue'
// 全局组件
import { Button } from './Button'

export function registerGlobComponents(app: App<Element>): void {
  app.use(Button).use(Input).use(Layout)
}
