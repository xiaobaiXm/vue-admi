import type { AppRouteModule } from '@/router/types'

import { LAYOUT, REDIRECT_NAME, EXCEPTION_COMPONENT, PAGE_NOT_FOUND_NAME } from '@/router/constant'

// 404
export const PAGE_NOT_FOUND_ROUTE: AppRouteModule = {
  name: PAGE_NOT_FOUND_NAME,
  path: '/:path(.*)*',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      name: PAGE_NOT_FOUND_NAME,
      path: '/:path(.*)*',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

// redirect route
export const REDIRECT_ROUTE: AppRouteModule = {
  name: `${REDIRECT_NAME}To`,
  path: '/redirect',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      name: REDIRECT_NAME,
      path: '/redirect/:path(.*)',
      component: () => import('@/views/system/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true
      }
    }
  ]
}

// error log
export const ERROR_LOG_ROUTE: AppRouteModule = {
  name: 'ErrorLog',
  path: '/error-log',
  component: LAYOUT,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('@/views/sys/error-log/index.vue'),
      meta: {
        // title: t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log'
      }
    }
  ]
}
