import type { AppRouteModule } from '@/router/types'

export const mainOutRoutes: AppRouteModule[] = [
  {
    name: 'MainOut',
    path: '/main-out',
    component: () => import('@/layout/demo/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      implements: true
    }
  }
]

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name)
