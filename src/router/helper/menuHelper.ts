import type { RouteParams } from 'vue-router'
import type { AppRouteModule, Menu, AppRouteRecordRaw } from '@/router/types'
import { toRaw } from 'vue'
import { cloneDeep } from 'lodash-es'
import { treeMap } from '@/utils/helper/treeHelper'
import { isUrl } from '@/utils/is'
function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // 不是/开头的路径 拼接父路由路径
    if (!(menu.path.startsWith('/') && isUrl(menu.path))) menu.path = `${parentPath}/${menu.path}`
    // 递归处理子路由
    if (menu?.children?.length) joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
  }
}
export function transformRouteToMenu(routeModList: AppRouteModule[], routeMapping = false) {
  const cloneRoutesModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []
  cloneRoutesModList.forEach((item) => {
    if (routeMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') item.path = item.redirect
    if (item.meta.single) {
      const realList = item?.children?.[0]
      realList && routeList.push(realList)
    } else {
      routeList.push(item)
    }
  })
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node
      return {
        ...(node.meta || {}),
        ...(node.redirect ? { redirect: node.redirect } : {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path
      }
    }
  })
  joinParentPath(list)
  return cloneDeep(list)
}
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams): void {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)
  matchArr?.forEach((item) => {
    const realIt = item.substring(1)
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string)
    }
  })
}
