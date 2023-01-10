import { provide, InjectionKey, reactive, inject, UnwrapRef, readonly as defineReadonly } from 'vue'

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}
export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}
export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), options: CreateContextOptions = {}) {
  const { readonly = true, createProvider = false, native = false } = options
  const state = reactive(context)
  const providerData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : providerData)
  return { state }
}
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T
export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
