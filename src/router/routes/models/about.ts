import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'
const about: AppRouteModule = {
  name: 'About',
  path: '/about/index',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.about'),
    orderNo: 100000
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/system/about/index.vue'),
      meta: {
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
        title: t('routes.dashboard.about')
      }
    }
  ]
}

export default about
