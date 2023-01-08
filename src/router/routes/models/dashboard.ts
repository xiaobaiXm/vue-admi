import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const dashboard: AppRouteModule = {
  name: 'Dashboard',
  path: '/dashboard',
  component: LAYOUT
}

export default dashboard
