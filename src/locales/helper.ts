import type { LocaleType } from '/#/config'
import { set } from 'lodash-es'
export const LoadLocalePool: LocaleType[] = []
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {}
  Object.keys(langs).forEach((key: string) => {
    const langFileModule = langs[key].default
    // 获取完整文件名 去掉多余部分
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    // 去掉文件扩展名
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')
    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}
export function setHtmlPageLang(locale: LocaleType) {
  // 设置页面语言
  document.querySelector('html')?.setAttribute('lang', locale)
}
export function setLoadLocalePool(callback: (loadLocalePool: LocaleType[]) => void) {
  callback(LoadLocalePool)
}
