import type { LocaleType } from '/#/config'
import { computed, unref } from 'vue'
import { i18n } from './setupI18n'
import { loadLocalePool, setHtmlPageLang } from './helper'
import { useLocaleStoreWithOut } from '@/stores/models/locale'
interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}
function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}
export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed((): LocaleType => localeStore.getLocale)
  const getShowLocalePicker = computed((): boolean => localeStore.getShowPicker)
  const getAntdLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {}
  })
  async function changeLocale(locale: LocaleType): Promise<string | undefined> {
    const globalI18n = i18n.global
    const currentLcoale = globalI18n.locale
    if (currentLcoale === locale) return locale
    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    // 重新获取语言包 设置当前语言包
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
    if (!langModule) return
    const { message } = langModule
    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)
    setI18nLanguage(locale)
    return locale
  }
  return {
    changeLocale,
    getLocale,
    getShowLocalePicker,
    getAntdLocale
  }
}
