import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

// 白名单
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]): void => {
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    if (Array.isArray(item.children) && item.children.length > 0) {
      getRouteNames(item.children)
    }
  })
}
getRouteNames(basicRoutes)

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>): void {
  app.use(router)
}
