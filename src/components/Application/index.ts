import { withInstall } from '@/utils'

import appLogo from './src/AppLogo.vue'
import appDarkModeToggle from './src/AppDarkModeToggle.vue'
import appLocalePicker from './src/AppLocalePicker.vue'
import appProvider from './src/AppProvider.vue'

export { useAppProviderContext } from './src/useAppContext'

export const AppLogo = withInstall(appLogo)
export const AppDarkModeToggle = withInstall(appDarkModeToggle)
export const AppLocalePicker = withInstall(appLocalePicker)
export const AppProvider = withInstall(appProvider)
