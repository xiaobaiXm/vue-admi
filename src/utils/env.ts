import type { GlobalEnvConfig } from '/#/config'
import { warn } from './log'
import pkg from '../../package.json'

// 获取配置文件名
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

// 获取app配置文件
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env)
  const ENV = import.meta.env.DEV
    ? (import.meta.env as unknown as GlobalEnvConfig)
    : (window[ENV_NAME as any] as unknown as GlobalEnvConfig)
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL
  } = ENV
  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    )
  }
  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL
  }
}

// 获取通用存储前缀
export function getCommonStoragePrefix(): string {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv}`.toUpperCase()
}

// 根据版本生成缓存键
export function getStorageShortName(): string {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

// 开发环境
export const devMode = 'development'

// 生产环境
export const prodMode = 'production'

// 判断是否是开发环境
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

// 判断是否是生产环境
export function isProdMode(): boolean {
  return import.meta.env.PROD
}

// 获取环境变量
export function getEnv(): string {
  return import.meta.env.MODE
}
