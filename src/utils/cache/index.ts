import { createStorage as create, CreateStorageParams } from './storageCache'
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '@/settings/encryptionSetting'
import { getStorageShortName } from '../env'
export type Options = Partial<CreateStorageParams>
const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // 生产环境不加密 生产环境进行加密
    hasEncrypt: enableStorageEncryption,
    prefixKey: getStorageShortName(),
    storage,
    ...options
  }
}
export const WebStorage = create(createOptions(sessionStorage))
export function createStorage(storage: Storage = sessionStorage, options: Options = {}) {
  return create(createOptions(storage, options))
}
// 创建localStorage
export function createLocalStorage(options: Options = {}) {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}
// 创建sessionStorage
export function createSessionStorage(options: Options = {}) {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage
