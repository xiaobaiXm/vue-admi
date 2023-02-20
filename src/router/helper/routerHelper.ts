import type { AppRouteModule } from '../types'
import { createRouter, createWebHashHistory } from 'vue-router'
import { cloneDeep } from 'lodash-es'
// 多级路由转化二级路由
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    console.log(routeModule)
    promoteRouteLevel(routeModule)
  }
  return modules
}
// 路由等级提升
function promoteRouteLevel(routeModues: AppRouteModule) {
  console.log(routeModues)
}
// 判断是否为多级路由
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children' || !routeModule.children?.length)) return false
  let flag = false
  const children = routeModule.children || []
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}
