import type { FunctionalComponent } from 'vue'
import type { RouteLocation } from 'vue-router'
export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable }
  route: RouteLocation
}
export default function getTransitionName({
  route,
  opentCache,
  cacheTabs,
  enableTransition,
  def
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean
  openCache: boolean
  def: string
  cacheTabs: string[]
}): string | undefined {
  if (!enableTransition) return undefined
  const isInCache = cacheTabs.includes(route.name as string)
  const transitionName = 'fade-slide'
  let name: string | undefined = transitionName
  if (opentCache) {
    name = isInCache && route.meta.loaded ? transitionName : undefined
  }
  return name
}
