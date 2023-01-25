import { TOKEN_KEY, CacheTypeEnum } from '@/enums/cacheEnum'
import { Persistent, BasicKeys } from '@/utils/cache/persistent'
import projectSetting from '@/settings/projectSetting'
// 判断app储存方式 默认储存方式localStorage
const { permissionCacheType } = projectSetting
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL
// 获取用户token
export function getToken(): string {
  return getAuthCache(TOKEN_KEY)
}
// 获取存储
export function getAuthCache<T>(key: BasicKeys): T {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}
// 设置储存
export function setAuthCache(key: BasicKeys, value: any) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value, true)
}
// 删除储存
export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}
