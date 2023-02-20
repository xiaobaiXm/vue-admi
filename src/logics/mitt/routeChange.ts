import type { RouteLocationNormalized } from 'vue-router'
import miit from '@/utils/miit'
import { getRawRoute } from '@/utils'
let lastChangeTab: RouteLocationNormalized
const emitter = miit()
const key = Symbol()
export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  // 简化路由信息
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}
