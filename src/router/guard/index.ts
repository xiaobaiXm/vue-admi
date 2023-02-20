import type { Router, RouteLocationNormalized } from 'vue-router'
import { unref } from 'vue'
import { Modal, notification } from 'ant-design-vue'
import nProgress from 'nprogress'
import { useAppStoreWithOut } from '@/stores/models/app'
import { useUserStoreWithOut } from '@/stores/models/user'
import { createParamMenuGuard } from './paramMenuGuard'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
import { setRouteChange } from '@/logics/mitt/routeChange'
import { useTransitionSetting } from '@/hooks/settings/useTransitionSetting'
import projectSetting from '@/settings/projectSetting'
import { AxiosCanceler } from '@/utils/http/axiosCancel'
import { warn } from '@/utils/log'
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
// 用于处理页面状态钩子
function createPageGuard(router: Router): void {
  const loadedPageMap = new Map<string, boolean>()
  router.beforeEach(async (to) => {
    // 映射已加载页面 是否被标记 已标记不用重新加载 直接进入
    to.meta.loaded = !!loadedPageMap.get(to.path)
    setRouteChange(to)
    return true
  })
  router.afterEach((to) => {
    // 进入页面后 标记该页面已被加载
    loadedPageMap.set(to.path, true)
  })
}
// 用于处理页面加载状态
function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut()
  const userStore = useUserStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (!userStore.getToken) return true
    if (!to.meta.loaded) return true
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }
    return true
  })
  router.afterEach(async () => {
    // 定时器模拟加载时间，以防止闪烁过快
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        appStore.setProjectLoading(false)
      }, 220)
    }
    return true
  })
}
// 路由切换时，用于关闭当前页面以完成请求的接口
function createHttpGuard(router: Router) {
  let axiosCanceler: Nullable<AxiosCanceler>
  const { removeAllHttpPending } = projectSetting
  if (removeAllHttpPending) axiosCanceler = new AxiosCanceler()
  router.beforeEach(async () => {
    // 切换路由会删除之前的请求
    axiosCanceler?.removeAllPending()
    return true
  })
}
// 路由开关回到顶部
function createScrollGuard(router: Router) {
  const body = document.body
  const isHash = (href: string) => /^#/.test(href)
  router.afterEach(async (to) => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
  })
}
// 路由切换时关闭消息实例
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting
  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll()
        notification.destroy()
      }
    } catch (error) {
      warn(`message guard error: ${error}`)
    }
    return true
  })
}
// http 加载状态
function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true
    unref(getOpenNProgress) && nProgress.start()
    return true
  })
  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done()
    return true
  })
}
