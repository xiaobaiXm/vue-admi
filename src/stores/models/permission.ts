import type { Menu, AppRouteRecordRaw } from '@/router/types'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { store } from '@/stores'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStoreWithOut } from './app'
import { useUserStoreWithOut } from './user'
import projectSetting from '@/settings/projectSetting'
import { PageEnum } from '../../enums/pageEnum'
import { PermissionModeEnum } from '@/enums/appEnum'
import { asyncRoutes } from '@/router/routes'
import { filter } from '@/utils/helper/treeHelper'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { flatMultiLevelRoutes } from '../../router/helper/routerHelper'
interface PermissionState {
  permCodeList: string[] | number[]
  isDynamicAddedRoute: boolean
  lastBuildMenuTime: number
  backMenuList: Menu[]
  frontMenuList: Menu[]
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 权限代码列表
    permCodeList: [],
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 后台菜单列表
    backMenuList: [],
    // 菜单列表
    frontMenuList: []
  }),
  actions: {
    setDynamicAddedRoute(added: boolean): void {
      this.isDynamicAddedRoute = added
    },
    setFrontMenuList(menuList: Menu[]): void {
      this.frontMenuList = menuList
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.backMenuList = []
      this.frontMenuList = []
      this.lastBuildMenuTime = 0
    },
    // 构建路由
    async buildRoutesAction(): Promise<any> {
      let routes: AppRouteRecordRaw[] = []
      // const { t } = useI18n()
      const appStore = useAppStoreWithOut()
      const userStore = useUserStoreWithOut()
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig
      // 路由过滤器
      const routeFilter = (route: AppRouteRecordRaw): boolean => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw): boolean => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }
      // 根据设置的首页path，修正routes中的affix标记（固定首页）
      const patchHomeAffix = (routes: AppRouteRecordRaw[]): void => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo.home_path || PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = `${parentPath}/`
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (error) {}
        return
      }
      switch (permissionMode) {
        // 角色权限
        case PermissionModeEnum.ROLE:
          break
        // 路由映射 默认方式
        case PermissionModeEnum.ROUTE_MAPPING:
          // 过滤非一级路由
          routes = filter(asyncRoutes, routeFilter)
          // 一级路由根据角色权限过滤
          routes = routes.filter(routeFilter)
          // 转换菜单
          const menuList = transformRouteToMenu(routes, true)
          // 移除标记的非一级路由
          routes = filter(routes, routeRemoveIgnoreFilter)
          // 移除标记的一级路由
          routes = routes.filter(routeRemoveIgnoreFilter)
          // 排序菜单
          menuList.sort((a, b) => ((a.meta?.orderNo || 0) as number) - ((b.meta?.orderNo || 0) as number))
          // 设置菜单
          this.setFrontMenuList(menuList)
          // 多级路由转化2级路由
          routes = flatMultiLevelRoutes(routes)
          break
        // 后台动态权限
        case PermissionModeEnum.BACK:
          break
      }
      patchHomeAffix(routes)
      return routes
    }
  },
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
