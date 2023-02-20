import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { store } from '@/stores'
import { Persistent } from '@/utils/cache/persistent'
import { MULTIPLE_TABS_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'
interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}
const cacheTab = projectSetting.multiTabsSetting.cache
export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => {
    return {
      // 需要缓存的选项卡
      cacheTabList: new Set(),
      tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
      lastDragEndIndex: 0
    }
  },
  actions: {
    // 根据当前打开的选项卡更新缓存
    async updateCacheTab() {}
  },
  getters: {
    getCaCheTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    }
  }
})

export function useMultipleTabStoreWithOut() {
  return useMultipleTabStore(store)
}
