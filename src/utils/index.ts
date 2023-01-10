import type { App, Plugin } from 'vue'
import { cloneDeep } from 'lodash-es'

import { isObject } from './is'

export const withInstall = <T>(component: T, alias?: string): T => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

// 深合并
export function deppMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  const res: any = cloneDeep(src)
  for (key in target) {
    res[key] = isObject(res[key]) ? deppMerge(src[key], target[key]) : (res[key] = target[key])
  }
  return res
}

export function isReportMode() {}
