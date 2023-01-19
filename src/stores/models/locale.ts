import type { LocaleType, LocaleSetting } from '/#/config'
import { defineStore } from 'pinia'
import { store } from '@/stores'
import { LOCALE_KEY } from '@/enums/cacheEnum'
import { createLocalStorage } from '@/utils/cache'
import { localeSetting } from '@/settings/localeSetting'
interface LocaleState {
  localeInfo: LocaleSetting
}
const ls = createLocalStorage()
const isLocaleSetting = ls.get(LOCALE_KEY || localeSetting) as LocaleSetting
export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => {
    return {
      localeInfo: isLocaleSetting
    }
  },
  actions: {
    setLocaleInfo(infio: Partial<LocaleSetting>): void {
      this.localeInfo = { ...this.localeInfo, ...infio }
      ls.set(LOCALE_KEY, this.localeInfo)
    }
  },
  getters: {
    getLocale(): LocaleType {
      return this.localeInfo?.locale ?? 'zh_CN'
    },
    getShowPicker(): boolean {
      return !!this.localeInfo?.showPicker
    }
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
