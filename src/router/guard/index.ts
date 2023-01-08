import type { Router } from 'vue-router'

import { useAppStoreWithOut } from '@/stores/models/app'
import { useUserStoreWithOut } from '@/stores/models/user'

import { createParamMenuGuard } from './paramMenuGuard'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router)
  createStateGuard(router)
}

// 用于处理页面状态的钩子
function createPageGuard(router: Router) {}

// 用于处理页面加载状态
function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut()
  const userStore = useUserStoreWithOut()
  router.beforeEach(async (to) => {})
  router.afterEach(async () => {})
}

// 路由切换时，用于关闭当前页面以完成请求的接口
function createHttpGuard(router: Router) {}

// 路由开关回到顶部
function createScrollGuard(router: Router) {}

// 用于在路由切换时关闭消息实例
export function createMessageGuard(router: Router) {}

function createProgressGuard(router: Router) {}
