import type { RouteLocationNormalized } from 'vue-router'
import type { UserInfo, LockInfo } from '/#/store'
import type { ProjectConfig } from '/#/config'
import { toRaw } from 'vue'
import { pick, omit } from 'lodash-es'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'
import {
  TOKEN_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  MULTIPLE_TABS_KEY
} from '@/enums/cacheEnum'
import { Memory } from './memory'
import { createLocalStorage, createSessionStorage } from '.'
export interface BasicStore {
  [TOKEN_KEY]: string | number | undefined | null
  [USER_INFO_KEY]: UserInfo
  [ROLES_KEY]: string[]
  [LOCK_INFO_KEY]: LockInfo
  [PROJ_CFG_KEY]: ProjectConfig
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[]
}
type LocalStore = BasicStore
type SessionStore = BasicStore
type LocalKeys = keyof LocalStore
type SessionKeys = keyof SessionStore
export type BasicKeys = keyof BasicStore
const ls = createLocalStorage()
const ss = createSessionStorage()
const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)
// 初始化持久内存
function initPersistentMemory(): void {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
  localCache && localMemory.resetCache(localCache)
  sessionCache && sessionMemory.resetCache(sessionCache)
}
export class Persistent {
  static getLocal<T>(key: LocalKeys): Nullable<T> {
    return localMemory.get(key)?.value as Nullable<T>
  }
  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value))
    immediate && ls.get(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }
  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key)
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }
  static clearLocal(immediate = false): void {
    localMemory.clear()
    immediate && ls.clear()
  }
  static getSession<T>(key: SessionKeys): Nullable<T> {
    return sessionMemory.get(key)?.value as Nullable<T>
  }
  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    immediate && sessionMemory.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
    sessionMemory.set(key, toRaw(value))
  }
  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key)
    immediate && sessionMemory.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear()
    immediate && ss.clear()
  }
  static clearAll(immediate = false): void {
    localMemory.clear()
    sessionMemory.clear()
    if (immediate) {
      ls.clear()
      ss.clear()
    }
  }
}

// 监听本地储存事件 监听储存发生变化
window.addEventListener('storage', function storageChange(e: any): void {
  console.log(e)
})

window.addEventListener('beforeunload', function (): void {
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...omit(localMemory.getCache, LOCK_INFO_KEY),
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY])
  })
  ss.set(APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache, LOCK_INFO_KEY),
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY])
  })
})

initPersistentMemory()
