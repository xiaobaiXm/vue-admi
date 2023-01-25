import type { ProjectConfig } from '/#/config'
import projectSetting from '@/settings/projectSetting'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { useLocaleStoreWithOut } from '@/stores/models/locale'
import { useAppStoreWithOut } from '@/stores/models/app'
import { Persistent } from '@/utils/cache/persistent'
import { deepMerge } from '@/utils'
import { primaryColor } from '../../build/config/themeConfig'
import { updateGrayMode } from './theme/updateGrayMode'
import { updateColorWeak } from './theme/updateColorWeak'
import { updateThemeMode } from './theme/dark'
import { changeTheme } from './theme'
export function initAppConfigStore(): void {
  const appStore = useAppStoreWithOut()
  const localeStore = useLocaleStoreWithOut()
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  const darkMode = appStore.getDarkMode
  const {
    colorWeak,
    grayMode,
    themeColor,
    headerSetting: { bgColor: headerColor } = {},
    menuSetting: { bgColor } = {}
  } = projCfg
  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor)
    }
    colorWeak && updateColorWeak()
    grayMode && updateGrayMode()
  } catch (error) {
    console.log(error)
  }
  appStore.setProjectConfig(projCfg)
  updateThemeMode(darkMode)
  localeStore.initLocale()
}
export function clearObsoleteStorage() {}
