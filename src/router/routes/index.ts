import type { AppRouteModule } from '../types'
import { PageEnum } from '@/enums/pageEnum'
import { mainOutRoutes } from './mainOut'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import { t } from '@/hooks/web/useI18n'

// 获取所有子路由
const models = import.meta.globEager('./models/**/*.ts')
const routeModelList: AppRouteModule[] = []

Object.keys(models).forEach((key: string) => {
  const model = models[key].default || {}
  const modelList = Array.isArray(model) ? [...model] : [model]
  routeModelList.push(...modelList)
})

// 异步路由
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModelList]

// 根路由
export const RootRoute: AppRouteModule = {
  name: 'Root',
  path: '/',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

export const LoginRoute: AppRouteModule = {
  name: 'Login',
  path: '/login',
  component: () => import('@/views/system/login/index.vue'),
  meta: {
    title: t('routes.basic.login')
  }
}

export const basicRoutes = [RootRoute, LoginRoute, ...mainOutRoutes, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE]
