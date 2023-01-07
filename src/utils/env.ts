import type { GlobalEnvConfig } from '/#/config'

export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env)
  const ENV = import.meta.env.DEV
    ? (import.meta.env as unknown as GlobalEnvConfig)
    : (window[ENV_NAME as any] as unknown as GlobalEnvConfig)
}
