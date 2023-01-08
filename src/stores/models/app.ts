import { defineStore } from 'pinia'
import { store } from '@/stores'

import { darkMode } from '@/settings/designSetting'
import { APP_DARK_MODE_KEY_ } from '@/enums/cacheEnum'
import { ThemeEnum } from '@/enums/appEnum'

interface AppState {
  darkMode?: ThemeEnum
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      darkMode: undefined
    }
  },
  actions: {
    setDarkMode(): void {}
  },
  getters: {
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
