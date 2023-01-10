export function getConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP__'}__CONF__`.toUpperCase().replace(/\s/g, '')
}
