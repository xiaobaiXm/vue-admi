import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export function setupRouter(app: App<Element>): void {
  app.use(router)
}
