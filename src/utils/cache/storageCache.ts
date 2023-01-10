import type { EncryptionParams } from '@/utils/cipher'
import { AesEncryption } from '@/utils/cipher'
import { error } from '@/utils/log'
import { cacheCipher } from '@/settings/encryptionSetting'
import { isNullOrUnDef } from '@/utils/is'
export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string
  storage: Storage
  hasEncrypt: boolean
  timeout?: Nullable<number>
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item: number) => item !== 16)) {
    error('当前如果是加密模式 密钥或者iv长度必须是16位')
  }
  // 加密内容
  const encryption = new AesEncryption({ key, iv })
  const WebStorage = class WebStorage {
    private prefixKey?: string
    private storage: Storage
    private encryption: AesEncryption
    private hasEncrypt: boolean
    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
      this.encryption = encryption
      this.hasEncrypt = hasEncrypt
    }
    private getKey(key: string): string {
      return `${this.prefixKey}${key}`.toUpperCase()
    }
    set(key: string, value: any, expire: number | null = timeout): void {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
      })
      const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
      this.storage.setItem(this.getKey(key), stringifyValue)
    }
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def
      try {
        const decValue = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
        const { value, expire } = JSON.parse(decValue)
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) return value
      } catch (e) {
        return def
      }
    }
    remove(key: string): void {
      this.storage.removeItem(this.getKey(key))
    }
    clear(): void {
      this.storage.clear()
    }
  }
  return new WebStorage()
}
