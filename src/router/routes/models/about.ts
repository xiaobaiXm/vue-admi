import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const about: AppRouteModule = {
  name: 'About',
  path: '/about',
  component: LAYOUT
}

export default about
