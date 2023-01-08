import { encrypt, decrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'
export interface EncryptionParams {
  key: string
  iv: string
}
export class AesEncryption {
  private key
  private iv
  constructor(options: Partial<EncryptionParams> = {}) {
    const { key, iv } = options
    key && (this.key = parse(key))
    iv && (this.iv = parse(iv))
  }
  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv
    }
  }
  // aes加密
  encryptByAES(cipherText: string): string {
    return encrypt(cipherText, this.key, this.getOptions).toString()
  }
  // aes解密
  decryptByAES(cipherText: string): string {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}
// base64加密
export function encryptByBase64(cipherText: string): string {
  return UTF8.parse(cipherText).toString(Base64)
}
// base64解密
export function decodeByBase64(cipherText: string): string {
  return Base64.parse(cipherText).toString(UTF8)
}
// MD5加密
export function encryptByMd5(password: string): string {
  return md5(password).toString()
}
