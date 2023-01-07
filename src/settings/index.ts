import type { GlobalEnvConfig } from '/#/config'

import { getAppEnvConfig } from '@/utils/env'

export const useGlobalSetting = () => {
  getAppEnvConfig()
}
