import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'
const dashboard: AppRouteModule = {
  name: 'Dashboard',
  path: '/dashboard',
  redirect: '/dashboard/workbench',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard')
  },
  children: [
    {
      name: 'Workbench',
      path: '/workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench')
      }
    }
  ]
}

export default dashboard
