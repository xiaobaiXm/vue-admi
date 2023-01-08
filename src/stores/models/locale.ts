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
  actions: {},
  getters: {}
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
