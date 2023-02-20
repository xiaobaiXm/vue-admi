import type { Router } from 'vue-router'
import type { Menu } from '../types'
import { usePermissionStoreWithOut } from '@/stores/models/permission'
import { useAppStoreWithOut } from '@/stores/models/app'
import { PermissionModeEnum } from '@/enums/appEnum'
import { configureDynamicParamsMenu } from '../helper/menuHelper'
export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    // 过滤无名路由
    if (!to.name) {
      next()
      return
    }
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    let menus: Menu[] = []
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList
    } else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}
const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}
const isBackMode = (): boolean => {
  return getPermissionMode() === PermissionModeEnum.BACK
}
const isRouteMappingMode = (): boolean => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
