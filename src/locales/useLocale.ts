import type { LocaleType } from '/#/config'
import { computed, unref } from 'vue'
import { i18n } from './setupI18n'
import { setHtmlPageLang } from './helper'
import { useLocaleStoreWithOut } from '@/stores/models/locale'
function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}
export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed((): string => localeStore.getLocale)
  const getShowLocalePicker = computed((): boolean => localeStore.getShowPicker)
  const getAntdLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {}
  })
  async function changeLocale(locale: LocaleType) {
    setI18nLanguage(locale)
  }
  return {
    changeLocale,
    getLocale,
    getShowLocalePicker,
    getAntdLocale
  }
}
