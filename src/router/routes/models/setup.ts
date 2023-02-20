import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'
const setup: AppRouteModule = {
  name: 'Setup',
  path: '/setup',
  redirect: '/setup/index',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    orderNo: 90000,
    title: t('routes.demo.setup.page'),
    icon: 'whh:paintroll'
  },
  children: [
    {
      path: 'index',
      name: 'SetupPage',
      component: () => import('@/views/setup/index.vue'),
      meta: {
        title: t('routes.demo.setup.page'),
        hideMenu: true,
        icon: 'whh:paintroll'
      }
    }
  ]
}

export default setup
