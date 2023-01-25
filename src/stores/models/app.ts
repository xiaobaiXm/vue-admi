import type { BeforeMiniState } from '/#/store'
import { defineStore } from 'pinia'
import { store } from '@/stores'
import { Persistent } from '@/utils/cache/persistent'
import { darkMode } from '@/settings/designSetting'
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { ThemeEnum } from '@/enums/appEnum'
import { ProjectConfig } from '/#/config'
import { deepMerge } from '@/utils'
interface AppState {
  pageLoading: boolean
  darkMode?: ThemeEnum
  projectConfig: ProjectConfig | null
  beforeMiniInfo: BeforeMiniState
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      darkMode: undefined,
      pageLoading: false,
      projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
      beforeMiniInfo: {}
    }
  },
  actions: {
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state
    }
  },
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
