import { InjectionKey, inject, UnwrapRef } from 'vue'

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T

export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
