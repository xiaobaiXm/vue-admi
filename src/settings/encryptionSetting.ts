import { isDevMode } from '@/utils/env'
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// 加密密钥
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

// 系统缓存是否加密
export const enableStorageEncryption = !isDevMode()
